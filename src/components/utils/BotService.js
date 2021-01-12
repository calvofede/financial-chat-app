const axios = require('axios');
const { Consumer } = require('../KafkaConsumer');
const callBot = (command) => {

    if (command.includes('stock_code')) {
        const ticker = command.substring(command.indexOf('=') + 1);
        try {
        axios.get(`http://localhost:3001/command/info/stock/${ticker}`);
        } catch(e){
            console.log(e);
        }
    }
    return;
}

const eventHandler = (message) => {
    console.log("I am message handler", message);
}

Consumer.start(eventHandler);

module.exports = {
    callBot
}