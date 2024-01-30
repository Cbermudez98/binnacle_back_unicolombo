import { HttpStatusCode } from "../../../shared/httpStatus/HttpStatus";
import { IBinnacleRepository } from "../../domain/IBinnacleRepository";
import { IBinnacleService } from "../../domain/IBinnacleService";
import { IBookCreate, IBook, IBookUpdate } from "../../domain/IBook";

export class BinnacleService implements IBinnacleService {
    private _repository: IBinnacleRepository;

    constructor(repository: IBinnacleRepository) {
        this._repository = repository;
    }

    async addBook(book: IBookCreate): Promise<IBook> {
        try {
            return await this._repository.create(book);
        } catch (error) {
            throw {
                error: "Error creating book",
                status: HttpStatusCode.UN_PROCESSABLE
            }
        }
    }

    async updateBook(id: string, book: IBookUpdate): Promise<boolean> {
        try {
            return await this._repository.update(id, book);
        } catch (error) {
            throw {
                error: "Error updating book",
                status: HttpStatusCode.NOT_MODIFIED
            }
        }
    }

    async getBook(id: string): Promise<IBook> {
        try {
            const book = await this._repository.get({ id });
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