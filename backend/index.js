const express = require('express');
const app = express();
const port = 3000
const db = require('./modules/dbConnect');
const winston = require('./modules/winstonConfig');
const morgan = require('morgan');
const cors = require('cors');

const options = {
    maxHttpBufferSize: 1e8,
    path: '/msg/',
    cors: {
        origin: '*',
    }
}; //1e6: 1MB
const server = require('http').createServer(app);
const io = require('socket.io')(server, options);

server.listen(4000);

io.on('connection', socket => {
    winston.info(`socket.io connected: ${options.path}` + socket.rooms.size);
    socket.join('room1');
    io.to('room1').emit('some event', { type: 'emoji', author: `me`, id: 17, data: { emoji: `😋` } });
    io.to('room1').emit('some event', { type: 'text', author: `me`, id: 18, data: { text: `Do you read me...`, meta: '✓✓ Read' } });
    socket.on('some event', (msg) => {
        console.log(msg);
        io.to('room1').emit('some event', msg);
    })
});

app.use(morgan('combined', { stream: winston.stream }));

app.use(cors());

app.get('/api/test', (req, res) => {
    db.getList()
        .then(rows => { res.json(rows) })
        .catch(err => { console.log(err) })
});

app.listen(port, () => {
    winston.info(`backend listening at http://localhost:${port}`);
})