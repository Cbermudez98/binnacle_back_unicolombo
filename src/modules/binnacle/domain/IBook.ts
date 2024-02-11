export interface IBook {
    id: string;
    title: string;
    description: string;
    author: string;
    active: true;
    url: string;
    image: string;
}

export interface IBookFind extends Partial<IBook> {}

export interface IBookCreate extends Omit<IBook, "id" | "url"> {
    book: string;
}

export interface INewBook extends Omit<IBook, "id"> {};

export interface IBookUpdate extends Partial<IBookCreate> {}

export interface IBookFilter {
    currentPage: number;
    totalPages: number;
    nextPage: number | null;
    prevPage: number | null;
    data: IBook[];
}