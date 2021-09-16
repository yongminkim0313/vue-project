const cookie = require("cookie");
const db = require('./dbConnect');
const fs = require('fs');


module.exports = (app, winston) => {
    const options = {
        maxHttpBufferSize: 1e8,
        path: '/msg/',
        cors: {
            origin: '*',
        },
        cookie: true
    }; //1e6: 1MB
    const server = require('http').createServer(app);
    const io = require('socket.io')(server, options);
    server.listen(4000);

    io.on('connection', socket => {
        socket.on('disconnect', () => { winston.info("@ socket disconnect @@@@"); });
        socket.on('reconnecting', () => { winston.info("@ socket reconnecting @@@@"); });
        socket.on('reconnection', () => { winston.info("@ socket reconnection @@@@"); });
        require('../sockService/list')(socket, db);
        require('../sockService/messenger')(socket);
        require('../sockService/sockFile')(socket);
        winston.info(`socket.io connected`);
    });
    return io;
}