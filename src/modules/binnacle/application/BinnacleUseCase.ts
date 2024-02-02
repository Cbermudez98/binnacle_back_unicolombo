import { IBinnacleService } from '../domain/IBinnacleService';
import { IBook, IBookCreate, IBookUpdate } from '../domain/IBook';
import { IBinnacleUseCase } from './../domain/IBinnacleUseCase';

export class BinnacleUseCase implements IBinnacleUseCase {
    private _binnacleService: IBinnacleService;
    constructor(binnacleService: IBinnacleService) {
        this._binnacleService = binnacleService;
        
    }
    async getBook(bookId: string, userId: string): Promise<IBook> {
        try {
            return await this._binnacleService.getBook(userId, bookId);
        } catch (error) {
            throw error;
        }
    }
    async getBooks(): Promise<IBook[]> {
        try {
            return await this._binnacleService.getBooks();
        } catch (error) {
            throw error;
        }
    }

    async addBook(book: IBookCreate): Promise<IBook> {
        try {
            return await this._binnacleService.addBook(book);
        } catch (error) {
            throw error;
        }
    }
    async updateBook(id: string, book: IBookUpdate): Promise<boolean> {
        try {
            return await this._binnacleService.updateBook(id, book);
        } catch (error) {
            throw error;
        }
    }
}