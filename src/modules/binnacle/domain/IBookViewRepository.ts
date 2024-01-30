import { IBookViewCrete } from "./IBookView";

export interface IBookViewRepository {
    register: (trace: IBookViewCrete) => Promise<void>;
}