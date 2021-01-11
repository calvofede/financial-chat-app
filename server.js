const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongo = require('./src/config/mongo');
// const routes = require('./src/routes');
const appConfig = require('./src/config/app');
const passport = require('passport');
require("./src/config/passport")(passport)
const session = require('express-session');
const flash = require('connect-flash');
const expressEjsLayout = require('express-ejs-layouts')

app.use(express.static(__dirname + '/views'));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());
app.use((req,res,next)=> {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error  = req.flash('error');
next();
})
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.set('socketio', io);
app.set('view engine','ejs');
app.use(expressEjsLayout);
app.use('/',require('./src/routes/index'));
app.use('/users',require('./src/routes/users'));

const server = http.listen(appConfig.port, () => {
    console.log('Listening on port ' + appConfig.port);
});

io.on('connection', () => {
    console.log('An User was connected...')
})