import { IBook, IBookCreate, IBookFind, IBookUpdate } from "./IBook";

export interface IBinnacleRepository {
    get: (book?: IBookFind) => Promise<IBook | IBook[]>;
    create: (book: IBookCreate) => Promise<IBook>;
    update: (id: IBook["id"], book: IBookUpdate) => Promise<boolean>;
}