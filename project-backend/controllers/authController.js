import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import { findUser, validatePassword, createUser, updateUser } from "../services/authServices.js";
import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env;

const signup = async(req, res) => {
    const { email } = req.body;

    const user = await findUser({email: email})
    // const user = await User.findOne({email: email});

    if(user) {
        throw HttpError(409, "Email in use")
    }

    const newUser = await createUser(req.body);

    // const hashPassword = await bcrypt.hash(req.body.password, 10)

    // const newUser = await User.create({...req.body, password: hashPassword})

    res.status(201).json({
        username: newUser.username,
        email: newUser.email
    })
}

const signin = async(req, res) => {
    const { email, password } = req.body;
    // const user = await User.findOne({email: email})
    const user = await findUser({email: email})

    if(!user) {
        throw HttpError(401, "Email or password wrong")
    }

    // const comparePassword = await bcrypt.compare(password, user.password);

    const comparePassword = await validatePassword(password, user.password);

    if(!comparePassword) {
        throw HttpError(401, "Email or password wrong")
    }

    const {_id: id} = user;

    const payload = {
        id
    }

    const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "23h"});
    await updateUser({_id: id}, {token});

    res.json({
        token: token
    })
}

const getCurrent = async(req, res) => {
    const { username, email } = req.user;

    res.json({
        username,
        email
    })
}

const signout = async(req, res) => {
    const {_id} = req.user;
    await updateUser({_id}, {token: ""});

    res.json({
        message: "Signout success"
    })
}

export default {
    signup: ctrlWrapper(signup),
    signin: ctrlWrapper(signin),
    getCurrent: ctrlWrapper(getCurrent),
    signout: ctrlWrapper(signout)
}