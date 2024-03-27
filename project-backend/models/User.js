import {Schema, model} from "mongoose";
import { emailRegexp } from "../constants/user-constants.js";

const userShema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        match: emailRegexp,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String
    }
}, {versionKey: false, timestamps: true});

const User = model("user", userShema);

export default User;