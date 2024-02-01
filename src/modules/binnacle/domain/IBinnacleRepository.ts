import { IBook, IBookFind, IBookUpdate, INewBook } from "./IBook";

export interface IBinnacleRepository {
    get: (book?: IBookFind) => Promise<IBook | IBook[]>;
    create: (book: INewBook) => Promise<IBook>;
    update: (id: IBook["id"], book: IBookUpdate) => Promise<boolean>;
}