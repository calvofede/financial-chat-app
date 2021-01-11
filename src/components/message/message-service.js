const dal = require('../dal');
const { getMessagesDb, postMessageDb } = dal;
const appConfig = require('../../config/app');
const { maxMessages } = appConfig;

const getMessagesService = async () => {
    try {
        return await getMessagesDb(maxMessages);
    } catch(e) {
        throw new Error(e);
    }
}

const postMessageService = async (message, io) => {
    try {


        //if stock command
        //call kafka producer (bot)
        //when received call postMessageDb

        await postMessageDb(message);
        io.emit('message', message);
        return;
    } catch(e) {
        throw new Error(e);
    }
}

module.exports = {
    getMessagesService,
    postMessageService
}