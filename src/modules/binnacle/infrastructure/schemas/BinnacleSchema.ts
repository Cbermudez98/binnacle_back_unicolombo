import Joi from "joi";
import { IBookCreate } from "../../domain/IBook";

const title = Joi.string();
const description = Joi.string();
const author = Joi.string();
const active = Joi.boolean();
const book = Joi.string();
const image = Joi.string();

export const bookCreate: Joi.ObjectSchema<IBookCreate> = Joi.object({
    title: title.required(),
    description: description.required(),
    author: author.required(),
    book: book.required(),
    image: image.required()
});

export const bookUpdate: Joi.ObjectSchema<IBookCreate> = Joi.object({
    title,
    description,
    author,
    book,
    active,
    image
});