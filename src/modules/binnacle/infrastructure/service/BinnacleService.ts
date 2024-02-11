import { HttpStatusCode } from "../../../shared/httpStatus/HttpStatus";
import { IBinnacleRepository } from "../../domain/IBinnacleRepository";
import { IBinnacleService } from "../../domain/IBinnacleService";
import { IBookCreate, IBook, IBookUpdate, IBookFilter } from "../../domain/IBook";
import { IBookViewRepository } from "../../domain/IBookViewRepository";
import FileUploader from "../../../../utils/FileUploader";
import { ParameterStore } from "../../../../utils/Constant";

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

            const urlImage = await FileUploader.uploadAndGetUrl({
                name: book.title,
                extension: "png",
                data: book.image,
                folder: ParameterStore.URL_BUCKET_IMAGE
            })
            const newBook = {
                ...book,
                url,
                image: urlImage
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
            const foundBook: IBook = await this._repository.get({ id }) as IBook;
            if(book.book) {
                const url = await FileUploader.uploadAndGetUrl(
                    {
                        data: book.book,
                        extension: "pdf",
                        folder: ParameterStore.URL_BUCKET_PDF,
                        name: book.title ?? foundBook.title
                    }
                );
                bookToUpdate.url = url;
            }

            if(book.image) {
                const url = await FileUploader.uploadAndGetUrl({
                    name: book.title ?? foundBook.title,
                    extension: "png",
                    data: book.image,
                    folder: ParameterStore.URL_BUCKET_IMAGE
                });
                bookToUpdate.image = url;
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

    async getBooks(limit: number, offset: number, book: string): Promise<IBookFilter> {
        try {
            const { count, data } = await this._repository.getAndCount(limit, offset, book);
            const currentPage = Math.floor(offset / limit) + 1;
            const totalPages = Math.ceil(count / limit);
            const nextPage = offset + limit < count ? currentPage + 1 : null;
            const prevPage = offset > 0 ? currentPage - 1 : null;
            return {
                currentPage,
                totalPages,
                nextPage,
                prevPage,
                data
            };
        } catch (error) {
            throw {
                error: "Error getting books",
                status: HttpStatusCode.NOT_FOUND
            }
        }
    }
}