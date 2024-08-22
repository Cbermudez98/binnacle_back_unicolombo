import { IUser } from "../../users/domain/IUser.interface";
import { IBook } from "./IBook";

export interface IBookView {
    user: IUser;
    book: IBook;
    opened_at: Date;
}

export interface IBookViewCreate {
    userId: IUser["id"];
    bookId: IBook["id"];
}