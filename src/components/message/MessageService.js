const dal = require('../Dal');
const Message = require('./MessageModel');
const { getMessagesDb, insertDb } = dal;
const { io } = require('../../../server');
const { callBot } = require('../../utils/BotService');

const getMessagesService = async () => {
    try {
        const maxMessages = parseInt(process.env.MAX_MESSAGES);
        return await getMessagesDb(maxMessages);
    } catch (e) {
        throw new Error(e);
    }
}

const postMessageService = async (newMessage) => {
    try {
        if (callBot(newMessage.message)) {
            return;
        } else {
            return await saveAndEmitMessage(newMessage);
        }
    } catch (e) {
        throw new Error(e);
    }
}

const saveAndEmitMessage = async(message) => {
    const newMessage = new Message(message);
    await insertDb(newMessage);
    io.emit('message', newMessage);
}

module.exports = {
    getMessagesService,
    postMessageService,
    saveAndEmitMessage
}