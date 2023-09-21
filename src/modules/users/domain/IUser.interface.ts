export interface IUserCreate {
    name: string;
    last_name: string,
    email: string;
    password: string;
    phone_number: string;
    student_id: string;
    document_number: string;
}

export interface IUser extends IUserCreate {
    id: number;
    created_at: Date;
    updated_at: Date | null;
}

export interface IUserLogin extends Pick<IUser, "email" | "password"> {}

export interface IUserUpdate extends Partial<Omit<IUser, "id" | "created_at" | "updated_at">> {}