require("dotenv").config();
const express = require('express');
const session = require('express-session')
const app = express();
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

app.use(session({
    secret: '!@#$GFDSQWE@!#',
    resave: true,
    saveUninitialized: true
}));

server.listen(4000);
const socket = require('./modules/socketConfig')(io, fs, db, winston);

app.use(morgan('combined', { stream: winston.stream }));

app.use(cors());

app.use(express.json());

app.get('/api/login/:username', (req, res) => {
    var username = req.params.username
    var sess = req.session;
    sess.username = username;
    console.log(sess);
});

app.get('/api/test', (req, res) => {
    sess = req.session;
    console.log(sess);
});

app.post('/api/downloadList', (req, res) => {
    db.getList('commonMapper', 'selectAtchmnflAll', {})
        .then(rows => {
            for (var i = 0; i < rows.length; i++) {
                rows[i].url = req.protocol + '://' + req.hostname + ':' + process.env.SERVER_PORT + '/api/download/' + rows[i].ATCHMNFL_ID;
            }
            res.json(rows)
        })
        .catch(err => { console.log(err) })
});

app.get('/api/download/:atchmnflId', (req, res) => {
    if (req.params.atchmnflId) {
        db.getData('commonMapper', 'selectAtchmnfl', { "atchmnflId": req.params.atchmnflId })
            .then(row => {
                if (row) {
                    res.setHeader("Content-Disposition", "attachment;filename=" + encodeURI(row.ATCHMNFL_ORIGIN_FILE_NM));
                    res.setHeader("Content-Type", "binary/octet-stream");
                    console.log("row.ATCHMNFL_PATH", row.ATCHMNFL_PATH)
                    var fileStream = fs.createReadStream(row.ATCHMNFL_PATH);
                    fileStream.pipe(res);
                } else {
                    console.log('No Download item !!!!!!')
                }
            })
            .catch(err => { console.log('err', err) })
    }
});

app.post('/api/deleteFile', (req, res) => {
    const atchmnflId = req.body.atchmnflId;
    console.log('socket');
    console.log(socket);
    console.log('socket');
    if (atchmnflId) {
        db.delData('commonMapper', 'deleteAtchmnfl', { "atchmnflId": atchmnflId })
            .then(row => {
                res.json(row);
            })
            .catch(err => { console.log('err', err) })
    }
});

app.listen(process.env.SERVER_PORT, () => {
    winston.info(`backend listening at http://localhost:${process.env.SERVER_PORT}`);
})