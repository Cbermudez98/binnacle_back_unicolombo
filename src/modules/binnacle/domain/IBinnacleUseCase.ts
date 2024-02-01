import { IUser } from "../../users/domain/IUser.interface";
import { IBook, IBookCreate, IBookUpdate } from "./IBook";

export interface IBinnacleUseCase {
    getBook: (bookId: IBook["id"], userId: IUser["id"]) => Promise<IBook>;
    getBooks: () => Promise<IBook[]>;
    addBook: (book: IBookCreate) => Promise<IBook>;
    updateBook: (id: IBook["id"], book: IBookUpdate) => Promise<boolean>;
}