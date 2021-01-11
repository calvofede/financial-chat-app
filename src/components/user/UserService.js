const dal = require('../dal');
const { createUserDb, findUserByEmail } = dal;
const bcrypt = require('bcrypt');
const appConfig = require('../../config/app');
const User = require('../user/UserModel');

const registerUser = async (name, email, password) => {
    try {
        const existingUser = await findUserByEmail(email);

        if (existingUser)
            throw new Error('Email already exists!');

        const newUser = new User({name, email, password});

        const hash = await bcrypt.hash(newUser.password, appConfig.saltRounds);
        newUser.password = hash;

        return await createUserDb(newUser);
    } catch (e) {
        throw new Error(e);
    }
}

module.exports = {
    registerUser
}