const Message = require('../models/message');

exports.getMessages = function(req, res, next) {
    Message.find({}).sort({date: -1}).limit(50).exec((err, messages) => {
        res.send(messages)});
};

exports.postMessage = function(req, res, next) {
    const message = new Message(req.body);
    message.save((err) => {
        if(err) {
            console.error('error, unable to send message');
            sendStatus(500);
        }
        const io = req.app.get('socketio');
        io.emit('message', message);
        res.sendStatus(200);
    })
};