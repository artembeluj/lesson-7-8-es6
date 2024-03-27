import Joi from "Joi"
import { genreList, isbnRegexp } from "../constants/book-constants.js"

export const addSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    favorite: Joi.boolean(),
    genre: Joi.string().valid(...genreList),
    // isbn: Joi.string().pattern(isbnRegexp).required()
})