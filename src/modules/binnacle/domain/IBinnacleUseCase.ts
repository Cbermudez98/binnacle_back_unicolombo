import { IUser } from "../../users/domain/IUser.interface";
import { IBook, IBookCreate, IBookFilter, IBookUpdate } from "./IBook";

export interface IBinnacleUseCase {
    getBook: (bookId: IBook["id"], userId: IUser["id"]) => Promise<IBook>;
    getBooks: (limit: number, offset: number, book: string) => Promise<IBookFilter>;
    addBook: (book: IBookCreate) => Promise<IBook>;
    updateBook: (id: IBook["id"], book: IBookUpdate) => Promise<boolean>;
}