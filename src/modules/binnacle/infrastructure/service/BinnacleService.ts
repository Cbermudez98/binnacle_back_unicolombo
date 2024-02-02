import { HttpStatusCode } from "../../../shared/httpStatus/HttpStatus";
import { IBinnacleRepository } from "../../domain/IBinnacleRepository";
import { IBinnacleService } from "../../domain/IBinnacleService";
import { IBookCreate, IBook, IBookUpdate } from "../../domain/IBook";
import { IBookViewRepository } from "../../domain/IBookViewRepository";
import FileUploader from "../../../../utils/FileUploader";
import { ParameterStore } from "../../../../utils/Constant";
import Logger from "../../../../utils/Logger";

export class BinnacleService implements IBinnacleService {
    private _repository: IBinnacleRepository;
    private _bookViewRepository: IBookViewRepository;

    constructor(repository: IBinnacleRepository, bookViewRepository: IBookViewRepository) {
        this._repository = repository;
        this._bookViewRepository = bookViewRepository;
    }

    async addBook(book: IBookCreate): Promise<IBook> {
        try {
            const url = await FileUploader.uploadAndGetUrl({
                name: book.title,
                extension: "pdf",
                folder: ParameterStore.URL_BUCKET_PDF,
                data: book.book
            });
            Logger.info(url);
            const newBook = {
                ...book,
                url
            } as any;
            delete newBook.book;
            return await this._repository.create(newBook);
        } catch (error) {
            throw {
                error: "Error creating book",
                status: HttpStatusCode.UN_PROCESSABLE
            }
        }
    }

    async updateBook(id: string, book: IBookUpdate): Promise<boolean> {
        try {
            const bookToUpdate = { ...book } as any;
            if(book.book) {
                const foundBook: IBook = await this._repository.get({ id }) as IBook;
                const url = await FileUploader.uploadAndGetUrl({ data: book.book, extension: "pdf", folder: ParameterStore.URL_BUCKET_PDF, name: book.title ?? foundBook.title })
                Logger.silly(url);
                bookToUpdate.url = url;
            }
            delete bookToUpdate.book;
            return await this._repository.update(id, bookToUpdate);
        } catch (error) {
            throw {
                error: "Error updating book",
                status: HttpStatusCode.NOT_MODIFIED
            }
        }
    }

    async getBook(userId: string, id: string): Promise<IBook> {
        try {
            const book = await this._repository.get({ id });
            await this._bookViewRepository.register({ bookId: id, userId });
            return book as IBook;
        } catch (error) {
            throw {
                error: "Error getting book",
                status: HttpStatusCode.NOT_FOUND
            }
        }
    }

    async getBooks(): Promise<IBook[]> {
        try {
            const books = await this._repository.get();
            return books as IBook[];
        } catch (error) {
            throw {
                error: "Error getting books",
                status: HttpStatusCode.NOT_FOUND
            }
        }
    }
}