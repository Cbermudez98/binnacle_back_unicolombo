import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IBook } from "../../domain/IBook";

@Entity({ name: "books" })
export class Book implements IBook {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "string", length: 100, nullable: false })
    title: string;

    @Column({ type: "string", length: 500, nullable: false })
    description: string;

    @Column({ type: "string", nullable: false })
    author: string;

    @Column({ type: "boolean", nullable: false })
    active: true;

    @Column({ type: "string", nullable: false })
    url: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    update_at: Date;
}