import { Entity, ManyToOne, PrimaryGeneratedColumn, Column } from "typeorm";
import { User } from "../../../users/infrastructure/entity/User.entity";
import { Book } from "./Book.entity";
import { IBookView } from "../../domain/IBookView";

@Entity({ name: "bookViews" })
export class BookView implements IBookView {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Book)
  book: Book;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  openedAt: Date;
}