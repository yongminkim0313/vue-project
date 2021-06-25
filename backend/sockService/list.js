module.exports = (socket, db) => {
    socket.on('selectUserList', (data, callback) => {
        console.log('data', data);
        console.log('callback', callback);
        try {
            db.getList('tbBbsMapper', 'selectUserList', {})
                .then(row => {
                    console.log(row);
                    callback({
                        status: "OK",
                        row
                    });
                })
                .catch(err => { console.log('err', err) })
        } catch (e) {
            callback({
                status: "NOK"
            });
        }
    });

    socket.on('selectYmBoardList', (data, callback) => {
        try {
            db.getList('test', 'selectYmBoardList', {})
                .then(row => {
                    callback({
                        status: "OK",
                        row
                    });
                })
                .catch(err => { console.log('err', err) })
        } catch (e) {
            callback({
                status: "NOK"
            });
        }
    });

    socket.on('saveYmBoard', (data, callback) => {
        console.log('data', data);
        console.log('callback', callback);
        try {
            db.setData('test', 'saveYmBoard', data)
                .then(row => {
                    console.log(row);
                    callback({
                        status: "OK",
                        row
                    });
                })
                .catch(err => { console.log('err', err) })
        } catch (e) {
            callback({
                status: "NOK"
            });
        }
    });


}