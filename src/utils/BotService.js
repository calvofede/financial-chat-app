const axios = require('axios');

const callBot = (command) => {
    if (!command.startsWith('/stock=')) return false;
    
    try {   
        const ticker = command.substring(command.indexOf('=') + 1);
        axios.get(`${process.env.BOT_HOST}${process.env.STOCK_BOT}${ticker}`);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

module.exports = {
    callBot
}