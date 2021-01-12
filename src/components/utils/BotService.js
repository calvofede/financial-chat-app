const axios = require('axios');

const callBot = async(command) => {

    if (command.includes('stock_code')) {
        const ticker = command.substring(command.indexOf('=') + 1);
        console.log(ticker);
        axios.get(`localhost:3001/command/info/stock/${ticker}`);
    }
}

module.exports = {
    callBot
}