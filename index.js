const express = require('./node_modules/express');
const path = require("path");
const app = express();
const socket = require('./node_modules/socket.io');

//if heroku is serving, set port to env.PORT that heroku passes
//otherwise sets port to 8080 for local dev
var port = Number.parseInt(process.env.PORT, 10) || 8080;
const server = app.listen(port, () => {
    console.log(`Listening for requests on port ${port}...`);
});

app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

//Creates the server side socket connection to listen for signals and emit signals
const io = socket(server);
io.on('connection', (socket) => {
    console.log('Socket Connection Established!!!', socket.id);
    socket.on('chat', data => {
        io.sockets.emit('chat', data);

    });
    socket.on('typing', data => {
        socket.broadcast.emit('typing', data);
    });
});

//Defines all the frontend routes that will render its respective pug page
app.get('/', (req, res) => {
    res.render('splash');
});

app.get('/log-in', (req, res) => {
    res.render('log-in');
});

app.get('/sign-up', (req, res) => {
    res.render('sign-up');
});

app.get('/main', (req, res) => {
    res.render('main');
});

app.get('/general', (req, res) => {
    res.render('general');
});

app.get('/help-requests', (req, res) => {
    res.render('help-requests');
});
