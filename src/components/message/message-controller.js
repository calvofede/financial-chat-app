const messageService = require('./message-service');
const { getMessagesService, postMessageService } = messageService;
const Message = require('./message');

const getMessages = async (req, res, next) => {
    try {
        const messages = await getMessagesService();
        res.send(messages);
        next();
    } catch(e) {
        console.error(e);
        res.sendStatus(500) && next(e);
    }
};

const postMessage = async (req, res, next) => {
    try {
        const message = new Message(req.body);
        const io = req.app.get('socketio');

        await postMessageService(message, io);
        res.sendStatus(200);
        next();
    } catch(e) {
        console.error(e);
        res.sendStatus(500) && next(e);
    }
};

module.exports = {
    getMessages,
    postMessage
}