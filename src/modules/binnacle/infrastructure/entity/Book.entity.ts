import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IBook } from "../../domain/IBook";

@Entity({ name: "books" })
export class Book implements IBook {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", length: 100, nullable: false })
    title: string;

    @Column({ type: "varchar", length: 500, nullable: false })
    description: string;

    @Column({ type: "varchar", nullable: false })
    author: string;

    @Column({ type: "boolean", nullable: false, default: true })
    active: true;

    @Column({ type: "varchar", nullable: false })
    url: string;

    @Column({ type: "varchar", nullable: false })
    image: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    update_at: Date;
}