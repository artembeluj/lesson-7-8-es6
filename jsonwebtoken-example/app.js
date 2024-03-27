import jwt from "jsonwebtoken";
import "dotenv/config";

const { JWT_SECRET } = process.env;

const payload = {
    id: "6601b3de56c7fa96b3cb302c"
};

const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "24h"});

// console.log(token);

const decodeToken = jwt.decode(token)

// console.log(decodeToken)

try {
    const { id } = jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDFiM2RlNTZjN2ZhOTZiM2NiMzAyYyIsImlhdCI6MTcxMTU1NTMyNiwiZXhwIjoxNzExNjQxNzI2fQ.xWyTdbBTWTkah", JWT_SECRET)

    console.log(id)

} catch (error) {
    console.log(error.message)
}