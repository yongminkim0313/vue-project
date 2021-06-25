module.exports = (app, io, db) => {

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
        if (atchmnflId) {
            db.delData('commonMapper', 'deleteAtchmnfl', { "atchmnflId": atchmnflId })
                .then(row => {
                    res.json(row);
                })
                .catch(err => { console.log('err', err) })
        }
    });

    app.post('/api/downloadList', (req, res) => {
        db.getList('commonMapper', 'selectAtchmnflAll', {})
            .then(rows => {
                console.log(rows);
                for (var i = 0; i < rows.length; i++) {
                    rows[i].url = req.protocol + '://' + req.hostname + ':' + process.env.SERVER_PORT + '/api/download/' + rows[i].ATCHMNFL_ID;
                }
                res.json(rows)
            })
            .catch(err => { console.log(err) })
    });
}