import express from "express";

import authController from "../controllers/authController.js";

import validateBody from "../decorators/validateBody.js";
import authenticate from "../middlewares/authenticate.js";

import {userSignupSchema, userSigninSchema } from "../schemas/usersSchemas.js";

const authRouter = express.Router();

// sign in
authRouter.post("/signin", validateBody(userSigninSchema), authController.signin)

// sign up
authRouter.post("/signup", validateBody(userSignupSchema), authController.signup)

authRouter.get("/current", authenticate, authController.getCurrent)

authRouter.post("/signout", authenticate, authController.signout)


export default authRouter;