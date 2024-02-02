import { Entity, ManyToOne, PrimaryGeneratedColumn, Column, CreateDateColumn, JoinColumn } from "typeorm";
import { User } from "../../../users/infrastructure/entity/User.entity";
import { Book } from "./Book.entity";
import { IBookView } from "../../domain/IBookView";

@Entity({ name: "book_views" })
export class BookView implements IBookView {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Book)
  @JoinColumn({ name: "book_id" })
  book: Book;

  @CreateDateColumn()
  opened_at: Date;
}