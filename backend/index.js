require("dotenv").config();
const express = require('express');
const session = require('express-session')
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

// app.get('/api/test', (req, res) => {
//     db.getList()
//         .then(rows => { res.json(rows) })
//         .catch(err => { console.log(err) })
// });

app.get('/api/download', (req, res) => {
    console.log('download!!!!')
    db.getData('commonMapper', 'selectAtchmnfl', { "atchmnflId": "12" })
        .then(row => {
            console.log(row);
            res.setHeader("Content-Disposition", "attachment;filename=" + encodeURI(row.ATCHMNFL_ORIGIN_FILE_NM));
            res.setHeader("Content-Type", "binary/octet-stream");
            console.log("row.ATCHMNFL_PATH", row.ATCHMNFL_PATH)
            var fileStream = fs.createReadStream(row.ATCHMNFL_PATH);
            fileStream.pipe(res);
        })
        .catch(err => { console.log(err) });
});

db.getData('userMapper', 'selectUser', {})
    .then(rows => console.log(rows));

app.listen(port, () => {
    winston.info(`backend listening at http://localhost:${port}`);
})