const messageService = require('./MessageService');
const { getMessagesService, postMessageService } = messageService;

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
        const reqMessage  = { ...req.body, name: req.user.name };
        await postMessageService(reqMessage);
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