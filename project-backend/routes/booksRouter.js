import express from "express";
import booksController from "../controllers/booksController.js";

import validateBody from "../decorators/validateBody.js";
import authenticate from "../middlewares/authenticate.js";
import { addSchema } from "../schemas/booksSchema.js";

const booksRouter = express.Router();

booksRouter.get("/", authenticate, booksController.getAll);

booksRouter.get("/:id", authenticate, booksController.getById);

booksRouter.post("/", authenticate,  validateBody(addSchema), booksController.add);

booksRouter.put("/:id", authenticate,  validateBody(addSchema), booksController.updateById);

booksRouter.delete("/:id", authenticate, booksController.removeById);

export default booksRouter;