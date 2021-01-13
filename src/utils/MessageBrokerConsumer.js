const kafka = require("kafka-node");

Kafka = module.exports;

const getConsumer = (eventHandler) => {

    const client = new kafka.KafkaClient({ kafkaHost: process.env.MESSAGE_BROKER_HOST });

    const topics = [{
        topic: process.env.MESSAGE_BROKER_STOCKS_TOPIC,
        offset: 0, //default 0
        partition: 0 // default 0
    }];

    const options = {
        autoCommit: true
    };

    client.on('ready', () => {
        console.log('Kafka client ready');
    })

    const consumer = new kafka.Consumer(client, topics, options);

    consumer.setMaxListeners(11);

    consumer.on("ready", function (message) {
        console.log("I am ready");
    });
    consumer.on("message", function (message) {
        eventHandler(message);
    });
    consumer.on("error", function (err) {
        console.log("error", err);
    });

    return consumer;
};

Kafka.Consumer = {
    start: getConsumer
};
