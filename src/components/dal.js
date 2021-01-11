const Message = require('./message/message');
const User = require('./user/user');

const getMessagesDb = async (LIMIT) => {
    try {
        return await Message.find({}).sort({ date: -1 }).limit(LIMIT).setOptions({ lean: true }).exec();
    } catch (e) {
        throw new Error(e);
    }
}

const postMessageDb = async (message) => {
    try {
        message.save((err) => {
            if (err)
                throw new Error('error, unable to insert message', err);
        })
    } catch (e) {
        throw new Error(e);
    }
}

const createUserDb = async (user) => {
    try {
        user.save((err) => {
            if (err)
                throw new Error('error, unable to insert user', err);
        })
    } catch (e) {
        throw new Error(e);
    }
}

const findUserByEmail = async (email) => {
    return await User.findOne({ email: email }).exec();
}

module.exports = {
    getMessagesDb,
    postMessageDb,
    createUserDb,
    findUserByEmail
}