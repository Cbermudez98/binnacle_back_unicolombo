export interface IBook {
    id: string;
    title: string;
    description: string;
    author: string;
    active: true;
    url: string;
}

export interface IBookFind extends Partial<IBook> {}

export interface IBookCreate extends Omit<IBook, "id" | "url"> {
    book: string;
}

export interface INewBook extends Omit<IBook, "id"> {};

export interface IBookUpdate extends Partial<IBookCreate> {}