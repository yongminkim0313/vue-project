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

io.on('connection', socket => {
    winston.info(`socket.io connected: ${options.path}`);
    socket.emit('messenger', { type: 'text', author: `system`, id: 0, data: { text: `접속되었습니다.`, meta: new Date().toTimeString() } });

    socket.on('messenger', (msg) => {
        socket.broadcast.emit('messenger', msg);
    })


    socket.on('Start', (data) => {
        console.log('socket start!!');
        console.log(data);
        var Name = data.Name;
        Files[Name] = {
            FileSize: data.Size,
            Data: "",
            Downloaded: 0
        };
        var Place = 0;
        var Stat = fs.statSync('Temp/' + Name);
        if (Stat.isFile()) {
            Files[Name].Downloaded = Stat.size;
            Place = Stat.size / 524288;
        }
        fs.open("Temp/" + Name, "a+", function(err, fd) {
            if (err) console.log(err);
            else {
                Files[Name].Handler = fd;
                socket.emit('MoreData', { 'Place': Place, Percent: 0 });
            }
        });
    });


    socket.on('MoreData', function(data) {
        UpdateBar(data.Percent);
        var Place = data.Place * 524288;
        var NewFile = '';
        if (SelectedFile.webkitSlice)
            NewFile = SelectedFile.webkitSlice(Place, Place + Math.min(524288, (SelectedFile.size - Place)));
        else
            NewFile = SelectedFile.slice(Place, Place + Math.min(524288, (SelectedFile.size - Place)));
        fileReader.readAsBinaryString(NewFile);
    });

    function UpdateBar(percent) {
        document.getElementById('percent').innerHTML = (Math.round(percent * 100) / 100) + '%';
        var MBDone = Math.round(((percent / 100.0) * SelectedFile.size) / 1048576);
        document.getElementById('MB').innerHTML = MBDone;
    }
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