import { DataSource, Repository } from "typeorm";
import { appDataSource } from "../../../../config/typeorm";
import { BookView } from "../entity/BookView.entity";
import { IBookViewCrete } from "../../domain/IBookView";
import { IBookViewRepository } from "../../domain/IBookViewRepository";

export class BookViewRepository implements IBookViewRepository {
    private _appDataSource: DataSource = appDataSource;
    private _bookViewRepository: Repository<BookView>;
 
    constructor() {
        this._bookViewRepository = this._appDataSource.getRepository(BookView);
    }

    async register(trace: IBookViewCrete): Promise<void> {
        const openingRecord = this._bookViewRepository.create({
            user: { id: trace.userId },
            book: { id: trace.bookId },
        });
        await this._bookViewRepository.save(openingRecord);
    }
}