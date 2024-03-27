import * as booksServices from "../services/booksServices.js"
import ctrlWrapper from "../decorators/ctrlWrapper.js"
import HttpError from "../helpers/HttpError.js"

const getAll = async (req, res) => {
    const {_id: owner} = req.user;
    const {page = 1, limit = 10} = req.query;
    const skip = (page - 1) * limit;
    const result = await booksServices.getAllBooks({owner}, {skip, limit});

    res.json(result);
}

const getById = async (req, res) => {
    const { id } = req.params;
    const {_id: owner} = req.user;
    // const result = await booksServices.getBookById(id);
    const result = await booksServices.getOneBook({_id: id, owner});
    if (!result) {
        throw HttpError(404, `Book with id=${id} not found`);
    }

    res.json(result);
}

const add = async (req, res) => {
    const {_id: owner} = req.user;
    const result = await booksServices.addBook({...req.body, owner});

    res.status(201).json(result);
}

const updateById = async (req, res) => {
    const { id } = req.params;
    const {_id: owner} = req.user;
    // const result = await moviesServices.updateMovieById(id, req.body);
    const result = await booksServices.updateOneBook({_id: id, owner}, req.body);
    if (!result) {
        throw HttpError(404, `Book with id=${id} not found`);
    }

    res.json(result);
}

const removeById = async (req, res) => {
    const { id } = req.params;
    const {_id: owner} = req.user;
    // const result = await booksServices.deleteBookById(id);
    const result = await booksServices.deleteOneBook({_id: id, owner});
    if (!result) {
        throw HttpError(404, `Book with id=${id} not found`);
    }

    res.json({
        message: "Delete success"
    })
}

export default {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    updateById: ctrlWrapper(updateById),
    removeById: ctrlWrapper(removeById)
}