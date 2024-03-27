import bcrypt from "bcrypt";

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(1)
    const result = await bcrypt.hash(password, salt);
    console.log(result)

    const compareResult = await bcrypt.compare("1234", result)

    // console.log(compareResult);
}

hashPassword("123")