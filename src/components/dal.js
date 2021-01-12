const Message = require('./message/MessageModel');
const User = require('./user/UserModel');

const getMessagesDb = async (LIMIT) => {
    try {
        return await Message.find({}).sort({ date: -1 }).limit(LIMIT).setOptions({ lean: true }).exec();
    } catch (e) {
        throw new Error(e);
    }
}

const insertDb = async (model) => {
    try {
        model.save((err) => {
            if (err)
                throw new Error('error, unable to insert on db', err);
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
    insertDb,
    findUserByEmail
}