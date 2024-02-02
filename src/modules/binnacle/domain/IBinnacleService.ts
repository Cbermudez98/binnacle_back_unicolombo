import { IUser } from './../../users/domain/IUser.interface';
import { IBook, IBookCreate, IBookFilter, IBookUpdate } from "./IBook";

export interface IBinnacleService {
    addBook: (book: IBookCreate) => Promise<IBook>;
    updateBook: (id: IBook["id"], book: IBookUpdate) => Promise<boolean>;
    getBook: (userId: IUser["id"], id: IBook["id"]) => Promise<IBook>
    getBooks: (limit: number, offset: number, book: string) => Promise<IBookFilter>;
}