import { IBookViewCreate } from "./IBookView";

export interface IBookViewRepository {
    register: (trace: IBookViewCreate) => Promise<void>;
}