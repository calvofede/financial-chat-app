const dal = require('../dal');
const Message = require('./MessageModel');
const { getMessagesDb, postMessageDb } = dal;
const appConfig = require('../../config/app');
const { maxMessages } = appConfig;
const { callBot } = require('./../utils/BotService');

const getMessagesService = async () => {
    try {
        return await getMessagesDb(maxMessages);
    } catch (e) {
        throw new Error(e);
    }
}

const postMessageService = async (reqMessage, io) => {
    try {
        if (reqMessage.message.includes('/')) {
            const command = reqMessage.message;
            callBot(command);
            return;
        } else {
            const newMessage = new Message(reqMessage);
            await postMessageDb(newMessage);
            io.emit('message', newMessage);
            return;
        }
    } catch (e) {
        throw new Error(e);
    }
}

module.exports = {
    getMessagesService,
    postMessageService
}