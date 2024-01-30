import { IBook, IBookCreate, IBookUpdate } from "./IBook";

export interface IBinnacleService {
    addBook: (book: IBookCreate) => Promise<IBook>;
    updateBook: (id: IBook["id"], book: IBookUpdate) => Promise<boolean>;
    getBook: (id: IBook["id"]) => Promise<IBook>
    getBooks: () => Promise<IBook[]>;
}