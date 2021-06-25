function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
module.exports = (io, fs, db, winston) => {


    io.on('connection', socket => {

        socket.use((event, next) => {
            console.log(socket.handshake.session);
            next();
        });
        socket.on('disconnect', (data) => {
            console.log("@ socket disconnect @@@@");
            winston.info("@ socket disconnect @@@@");
        });
        socket.on('reconnecting', (data) => {
            console.log("@ socket reconnecting @@@@");
            winston.info("@ socket reconnecting @@@@");
        });
        socket.on('reconnection', (data) => {
            console.log("@ socket reconnection @@@@");
            winston.info("@ socket reconnection @@@@");
        });
        require('../sockService/list')(socket, db);
        require('../sockService/messenger')(socket);
        require('../sockService/sockFile')(socket);
        winston.info(`socket.io connected`);
    });

}