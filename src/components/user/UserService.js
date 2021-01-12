const dal = require('../Dal');
const { insertDb, findUserByEmail } = dal;
const bcrypt = require('bcryptjs');
const User = require('../user/UserModel');

const registerUser = async (name, email, password) => {
    try {
        const existingUser = await findUserByEmail(email);

        if (existingUser)
            throw new Error('Error, email already exists!');

        const newUser = new User({name, email, password});

        const hash = await bcrypt.hash(newUser.password, parseInt(process.env.SALT_ROUNDS));
        newUser.password = hash;

        return await insertDb(newUser);
    } catch (e) {
        throw new Error(e);
    }
}

module.exports = {
    registerUser
}