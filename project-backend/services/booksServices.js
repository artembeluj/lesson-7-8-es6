import Book from "../models/Book.js";

export const getAllBooks = (filter = {}, query = {}) => Book.find(filter, "-createdAt -updatedAt", query).populate("owner", "username email");

export const getBookById = id => Book.findById(id);

export const getOneBook = filter => Book.findOne(filter);

export const addBook = data => Book.create(data);

export const updateBookById = (id, data) => Book.findByIdAndUpdate(id, data);

export const updateOneBook = (filter, data) => Book.findOneAndUpdate(filter, data);

export const deleteBookById = id => Book.findByIdAndDelete(id);

export const deleteOneBook = filter => Book.findOneAndDelete(filter);