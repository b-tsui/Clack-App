const express = require('express');
const path = require("path");
const app = express();
const socket = require('socket.io')

const port = 8080;

const server = app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

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

