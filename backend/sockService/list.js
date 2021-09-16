const crawling = require('../modules/crawlingTest');

function runFunction(socket, db, callName) {
    socket.on(callName, (data, callback) => {
        console.log('data', data);
        console.log('callback', callback);
        try {
            db.getList('test', callName, data)
                .then(function(row) {
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

function crawlingFunction(socket, db, callName) {
    socket.on(callName, async(data, callback) => {
        console.log('data', data);
        console.log('callback', callback);
        try {
            var crawlingData = await crawling.crawlingTest(db, data);
            callback(crawlingData);
        } catch (e) {
            console.log(e);
            callback({
                status: "NOK"
            });
        }
    });
}

module.exports = async(socket, db) => {
    runFunction(socket, db, 'selectYmBoardList');
    runFunction(socket, db, 'saveYmBoard');
    crawlingFunction(socket, db, 'test');
}