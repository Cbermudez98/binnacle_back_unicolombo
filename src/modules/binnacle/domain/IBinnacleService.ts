import { IUser } from './../../users/domain/IUser.interface';
import { IBook, IBookCreate, IBookUpdate } from "./IBook";

export interface IBinnacleService {
    addBook: (book: IBookCreate) => Promise<IBook>;
    updateBook: (id: IBook["id"], book: IBookUpdate) => Promise<boolean>;
    getBook: (userId: IUser["id"], id: IBook["id"]) => Promise<IBook>
    getBooks: () => Promise<IBook[]>;
}