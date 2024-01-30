import { DataSource, Repository } from "typeorm";
import { IBinnacleRepository } from "../../domain/IBinnacleRepository";
import { IBookUpdate, IBook, IBookCreate, IBookFind } from "../../domain/IBook";
import { appDataSource } from "../../../../config/typeorm";
import { Book } from "../entity/Book.entity";

export class BinnacleRepository implements IBinnacleRepository {
    private _appDataSource: DataSource = appDataSource;
    private _bookRepository: Repository<Book>;

    constructor() {
        this._bookRepository = this._appDataSource.getRepository(Book);
    }

    async get(book?: IBookFind | undefined): Promise<IBook | IBook[]> {
        try {
            if(book) {
                const response = await this._bookRepository.findOne({ where: { ...book } });
                if (response) return response;
                throw new Error("Error getting book");
            }
            const response = await this._bookRepository.find({ where: { active: true } });
            if (response) return response;
            throw new Error("Error getting books");
        } catch (error) {
            throw error;
        }
    }

    async create(book: IBookCreate): Promise<IBook> {
        try {
            return await this._bookRepository.save(book);
        } catch (error) {
            throw error;
        }
    };

    async update(id: string, book: IBookUpdate): Promise<boolean> {
        try {
            const { affected } = await this._bookRepository.update({ id }, { ...book });
            return Boolean(affected);
        } catch (error) {
            throw error;
        }
    }
}