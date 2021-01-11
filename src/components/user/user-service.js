const dal = require('../dal');
const { createUserDb, findUserByEmail } = dal;
const bcrypt = require('bcrypt');
const appConfig = require('../../config/app');

const registerUser = async (user) => {
    try {
        const existingUser = await findUserByEmail(user.email);

        if (existingUser)
            throw new Error('Email already exists!');

        const hash = await bcrypt.hash(user.password, appConfig.saltRounds);
        user.password = hash;

        return await createUserDb(user);
    } catch (e) {
        throw new Error(e);
    }
}

module.exports = {
    registerUser
}