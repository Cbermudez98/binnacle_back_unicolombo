import { IUser } from "../../users/domain/IUser.interface";
import { IBook } from "./IBook";

export interface IBookView {
    user: IUser;
    book: IBook;
}

export interface IBookViewCrete {
    userId: IUser["id"];
    bookId: IBook["id"];
}