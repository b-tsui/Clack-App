const express = require('./node_modules/express');
const path = require("path");
const app = express();
const socket = require('./node_modules/socket.io');

var port = Number.parseInt(process.env.PORT, 10) || 49710;
const server = app.listen(port, () => {
    console.log(`Listening for requests on port ${port}...`);
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

app.get('/general', (req, res) => {
    res.render('general');
});

app.get('/help-requests', (req, res) => {
    res.render('help-requests');
});

