require("dotenv").config();
const express = require('express');
const session = require('express-session')
const MySQLStore = require('express-mysql-session')(session);
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

const sessionStore = new MySQLStore({
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    clearExpired: true,
    checkExpirationInterval: 30000, //30 seconds
    expiration: 1000
});

app.use(session({
    secret: "asdfasffdas",
    resave: false,
    saveUninitialized: true,
    cookie: { originalMaxAge: 30000 },
    store: sessionStore
}))

const server = require('http').createServer(app);
const io = require('socket.io')(server, options);

server.listen(4000);
const socket = require('./modules/socketConfig')(io, fs, db, winston);

app.use(morgan('combined', { stream: winston.stream }));

app.use(cors());

app.use(express.json());

// app.use(function(req, res, next) {
//     console.log(req.url);
//     if (req.session.isLogined || req.url.indexOf('/auth') > -1) {
//         next();
//     } else {
//         res.status(403).json({ error: '로그인이 필요합니다!' });
//     }
// });

const auth = require('./services/auth')(app, io);
const file = require('./services/file')(app, io);

app.get('/test1', (req, res) => {
    req.session.aaaa = 11111;
    console.log(req.session);
    req.session.save();
    res.json(req.session);
});

app.get('/test2', (req, res) => {
    sess = req.session;
    console.log(sess);
    res.json(sess);
});

app.listen(process.env.SERVER_PORT, () => {
    winston.info(`backend listening at http://localhost:${process.env.SERVER_PORT}`);
})