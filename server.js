const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongo = require('./config/mongo');
const messageController = require('./controllers/message-controller');

const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

const server = http.listen(PORT, () => {
    console.log('Listening on port ' + PORT);
});

app.use(express.static(__dirname));

io.on('connection', () => {
    console.log('An User was connected...')
})

app.set('socketio', io);

app.get('/messages', messageController.getMessages);

app.post('/messages', messageController.postMessage);

