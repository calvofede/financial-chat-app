const kafka = require("kafka-node");

Kafka = module.exports;

const getConsumer = () => {

    const client = new kafka.KafkaClient({kafkaHost: 'localhost:9092'});

    console.log("Initialised..");
    const topics = [{
        topic: 'chatbot',
        offset: 0, //default 0
        partition: 0 // default 0
     }];
    
    const options = {
        autoCommit: true
    };
    
    const consumer = new kafka.Consumer(client, topics, options);
    
    consumer.setMaxListeners(11);

    consumer.on("ready", function(message) {
        console.log("I am ready");
    });
    consumer.on("message", function(message) {
        console.log("Hey got message", message);
        // console.log(message);
    
       console.log("Message: ", message.value);
    });
    
    consumer.on("error", function(err) {
        console.log("error", err);
    });

    return consumer;
  };

  Kafka.Consumer = {
    start: getConsumer
  };
  