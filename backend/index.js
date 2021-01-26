const express = require('express');
const app = express();
const port = 3000
const db = require('./modules/dbConnect');
const winston = require('./modules/winstonConfig');
const morgan = require('morgan');

app.use(morgan('combined', { stream: winston.stream }));

app.get('/', (req, res) => {
    db.getList()
        .then(rows => { res.json(rows) })
        .catch(err => { console.log(err) })
})

app.listen(port, () => {
    winston.info(`backend listening at http://localhost:${port}`);
})