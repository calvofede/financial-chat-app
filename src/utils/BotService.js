const axios = require('axios');
const { Consumer } = require('./MessageBrokerConsumer');

const callBot = (command) => {
    if (!command.startsWith('/stock=')) return false;
    
    try {   
        const ticker = command.substring(command.indexOf('=') + 1);
        axios.get(`http://localhost:3001/command/info/stock/${ticker}`);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

const eventHandler = (message) => {
    const newMessage = new Message({message: message, name: 'Bot', date: Date.now});
    io.emit("message", newMessage);
};

Consumer.start(eventHandler);

module.exports = {
    callBot
}