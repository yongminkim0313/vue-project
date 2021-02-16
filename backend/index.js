const express = require('express');
const app = express();
const port = 3000
const db = require('./modules/dbConnect');
const winston = require('./modules/winstonConfig');
const morgan = require('morgan');
const cors = require('cors');
const fs = require('fs');

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
const upload = require('./modules/socketConfig')(io, fs, db, winston);

app.use(morgan('combined', { stream: winston.stream }));

app.use(cors());

app.get('/api/test', (req, res) => {
    db.getList()
        .then(rows => { res.json(rows) })
        .catch(err => { console.log(err) })
});

app.get('/api/download', (req, res) => {
    console.log('download!!!!')
    res.setHeader("Content-Disposition", "attachment;filename=" + encodeURI("마루Z_small.avi.mp4"));
    res.setHeader("Content-Type", "binary/octet-stream");
    var fileStream = fs.createReadStream('./video/마루Z_small.avi.mp4');
    fileStream.pipe(res);
});

app.listen(port, () => {
    winston.info(`backend listening at http://localhost:${port}`);
})