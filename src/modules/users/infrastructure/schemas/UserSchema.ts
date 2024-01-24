import joi from "joi";
import { IUserLogin, IUserCreate, IUserUpdate } from "../../domain/IUser.interface";

const name = joi.string().min(3);
const last_name = joi.string().min(3);
const email = joi.string().email()
    .regex(new RegExp(/^[a-zA-Z0-9._%+-]+@unicolombo\.edu\.co$/))
    .message("Invalid email");
const password = joi.string().min(8).regex(new RegExp(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_]).{8,}$/));
const phone_number = joi.string().min(10).max(12);
const student_id = joi.string().min(10).max(14);
const document_number = joi.string().min(7).max(12);

export const useSchema: joi.ObjectSchema<IUserCreate> = joi.object({
    name: name.required(),
    last_name: last_name.required(),
    email: email.required(),
    password: password.required(),
    phone_number: phone_number.required(),
    student_id: student_id.required(),
    document_number: document_number.required()
});

export const userUpdateSchema: joi.ObjectSchema<IUserUpdate> = joi.object({
    name,
    last_name,
    document_number,
    email,
    password,
    phone_number,
    student_id
});

export const userLoginSchema: joi.ObjectSchema<IUserLogin> = joi.object({
    email: email.required(),
    password: password.required()
});