const dal = require('../Dal');
const Message = require('./MessageModel');
const { getMessagesDb, insertDb } = dal;
const { io } = require('../../../server');
const { callBot } = require('../../utils/BotService');
const { Consumer } = require('../../utils/MessageBrokerConsumer');

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

const eventHandler = (message) => {
    const newMessage = new Message({message: message.value, name: 'Bot', date: Date.now});
    saveAndEmitMessage(newMessage);
};

Consumer.start(eventHandler);

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