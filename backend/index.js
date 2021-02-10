const express = require('express');
const app = express();
const port = 3000
const db = require('./modules/dbConnect');
const winston = require('./modules/winstonConfig');
const morgan = require('morgan');
const cors = require('cors');
const fs = require('fs');

const temp = "./temp/";
const uploadFile = "./uploadFile/";

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


    var Files = Object();
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
        fs.appendFileSync(temp + Name, "");
        var Stat = fs.statSync(temp + Name);
        if (Stat.isFile()) {
            Files[Name].Downloaded = Stat.size;
            Place = Stat.size / 524288;
            console.log('Stat.size:', Stat.size);
        }
        fs.open(temp + Name, "a+", function(err, fd) {
            if (err) console.log(err);
            else {
                Files[Name].Handler = fd;
                socket.emit('MoreData', { 'Place': Place, Percent: 0 });
            }
        });
    });

    socket.on('Upload', (data) => {
        console.log('socket upload!!');
        var Name = data.Name;
        Files[Name].Downloaded += data.Data.length;
        Files[Name].Data += data.Data;
        if (Files[Name].Downloaded == Files[Name].FileSize) {
            fs.write(Files[Name].Handler, Files[Name].Data, null, 'Binary', function(err, written) {
                if (err) console.error(err);
                //Generate movie thumbnail
                var readable = fs.createReadStream(temp + Name);
                var writable = fs.createWriteStream(uploadFile + Name);
                readable.pipe(writable);
                writable.on('finish', function(err) {
                    if (err) console.error(err);
                    console.log(Name + " : writing is completed.");
                    fs.close(Files[Name].Handler, function(err) { //close fs module
                        if (err) console.error(err, Files);
                        fs.unlink(temp + Name, function(err) {
                            //Moving File is Completed
                            if (err) console.error(err);
                            socket.emit('endData', { 'Place': Place, 'Percent': 100 });
                            console.log(Name + " is deleted.");
                        });
                    });
                });
            });
        } else if (Files[Name].Data.length > 10485760) {
            fs.write(Files[Name].Handler, Files[Name].Data, null, 'Binary', function(err, written) {
                Files[Name].Data = ""; //Reset The Buffer
                var Place = Files[Name].Downloaded / 524288;
                var Percent = (Files[Name].Downloaded / Files[Name].FileSize) * 100;
                socket.emit('MoreData', { 'Place': Place, 'Percent': Percent });
            });
        } else {
            var Place = Files[Name].Downloaded / 524288;
            var Percent = (Files[Name].Downloaded / Files[Name].FileSize) * 100;
            socket.emit('MoreData', { 'Place': Place, 'Percent': Percent });
        }
    });
});

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