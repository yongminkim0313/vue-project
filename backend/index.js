const express = require('express');
const app = express();
const port = 3000
const db = require('./modules/dbConnect');

app.get('/', (req, res) => {
    db.getList()
        .then(rows => { res.json(rows) })
        .catch(err => { console.log(err) })
})

app.listen(port, () => {
    console.log(`backend listening at http://localhost:${port}`);
})