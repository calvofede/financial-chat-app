require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http').Server(app);
var io = exports.io = require('socket.io')(http);
require('./src/config/Mongo');
const passport = require('passport');
require("./src/config/Passport")(passport)
const session = require('express-session');
const expressEjsLayout = require('express-ejs-layouts');
const logger = require('morgan');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/views'));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');
app.use(expressEjsLayout);

app.use(logger('dev'));

http.listen(process.env.PORT, () => {
    console.log('Listening on port ' + process.env.PORT);
});

app.use('/', require('./src/routes/index'), require('./src/components/message/MessageRoutes'));
app.use('/users', require('./src/components/user/UserRoutes'));