function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
module.exports = (io, fs, db, winston) => {
    const temp = "./temp/";
    const uploadFile = "./uploadFile/";

    io.on('connection', socket => {
        winston.info(`socket.io connected`);
        socket.emit('messenger', { type: 'text', author: `system`, id: 0, data: { text: `접속되었습니다.`, meta: new Date().toTimeString() } });

        socket.on('messenger', (msg) => {
            socket.broadcast.emit('messenger', msg);
        })

        var Files = Object();
        socket.on('Start', (data) => {
            winston.info('socket start!!');
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
            }
            fs.open(temp + Name, "a+", function(err, fd) {
                if (err) winston.err(err);
                else {
                    Files[Name].Handler = fd;
                    socket.emit('MoreData', { 'Place': Place, Percent: 0 });
                }
            });
        });

        socket.on('Upload', (data) => {
            //winston.info('socket upload!!');
            var Name = data.Name;
            Files[Name].Downloaded += data.Data.length;
            Files[Name].Data += data.Data;
            if (Files[Name].Downloaded == Files[Name].FileSize) {
                var atchmnflNm = uuidv4();
                fs.write(Files[Name].Handler, Files[Name].Data, null, 'Binary', function(err, written) {
                    if (err) console.error(err);
                    //Generate movie thumbnail
                    var readable = fs.createReadStream(temp + Name);
                    var writable = fs.createWriteStream(uploadFile + atchmnflNm);
                    readable.pipe(writable);
                    writable.on('finish', function(err) {
                        if (err) console.error(err);
                        winston.info(atchmnflNm + " : writing is completed.");
                        fs.close(Files[Name].Handler, function(err) { //close fs module
                            if (err) console.error(err, Files);
                            fs.unlink(temp + Name, function(err) {
                                //Moving File is Completed
                                if (err) console.error(err);
                                socket.emit('endData', { 'Place': Place, 'Percent': 100 });
                                winston.info(Name + " is deleted.");
                                var dbData = {
                                    "atchmnflNm": atchmnflNm,
                                    "atchmnflOriginFileNm": Name,
                                    "atchmnflSize": Files[Name].FileSize,
                                    "atchmnflPath": uploadFile + atchmnflNm,
                                    "atchmnflExtsnNm": Name.substr(Name.lastIndexOf(".") + 1),
                                    "rgsterId": '1'
                                }

                                db.setData('commonMapper', 'insertAtchmnfl', dbData);
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

}