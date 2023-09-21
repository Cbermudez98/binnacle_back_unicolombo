import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { IUser } from "../../domain/IUser.interface";

@Entity()
export class User implements IUser {
    @PrimaryGeneratedColumn({ type: "int" })
    id: number;

    @Column({ type: "varchar", length: 10 })
    name: string;

    @Column({ type: "varchar", length: 20 })
    last_name: string;

    @Column({ type: "varchar", length: 50, unique: true })
    email: string;

    @Column({ type: "varchar", length: 100 })
    password: string;

    @Column({ type: "varchar", length: 15, unique: true })
    phone_number: string;

    @Column({ type: "varchar", length: 15, unique: true })
    student_id: string;
    
    @Column({ type: "varchar", length: 15, unique: true })
    document_number: string;
    
    @CreateDateColumn()
    created_at: Date;
    
    @UpdateDateColumn()
    updated_at: Date;
}