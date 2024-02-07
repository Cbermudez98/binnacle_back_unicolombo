import { IBook, IBookFind, IBookUpdate, INewBook } from "./IBook";

export interface IBinnacleRepository {
    get: (book?: IBookFind) => Promise<IBook | IBook[]>;
    getAndCount: (limit: number, offset: number, title: IBook["title"]) => Promise<{ data: IBook[], count: number }>; 
    create: (book: INewBook) => Promise<IBook>;
    update: (id: IBook["id"], book: IBookUpdate) => Promise<boolean>;
}