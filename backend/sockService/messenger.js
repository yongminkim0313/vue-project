module.exports = (socket) => {

    socket.emit('messenger', { type: 'text', author: `system`, id: 0, data: { text: `접속되었습니다.`, meta: new Date().toTimeString() } });

    socket.on('messenger', (msg) => {
        socket.broadcast.emit('messenger', msg);
    });
}