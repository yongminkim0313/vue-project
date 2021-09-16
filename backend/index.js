require("dotenv").config();
const express = require('express');
const app = express();
const winston = require('./modules/winstonConfig');
const morgan = require('morgan');
app.use(morgan('combined', { stream: winston.stream }));
app.use(require('cors')({ origin: true, credentials: true }));
app.use(express.json());
app.listen(process.env.SERVER_PORT, () => {
    winston.info(`backend listening at http://localhost:${process.env.SERVER_PORT}`);
})
const io = require('./modules/socketConfig')(app, winston);

// const auth = require('./services/auth')(app, io, db);
// const file = require('./services/file')(app, io, db);

const sharedsession = require("express-socket.io-session");
const session = require('express-session')
const MySQLStore = require('express-mysql-session')(session);
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
const cookieOptions = {
    maxAge: 1000 * 60 * 1,
    // secure:true, 브라우저가 HTTPS를 통해서만 쿠키를 전송하도록 합니다.
    httpOnly: false,
    // 쿠키가 클라이언트 JavaScript가 아닌 HTTP(S)를 통해서만 전송되도록 하며, 이를 통해 XSS(Cross-site scripting) 공격으로부터 보호할 수 있습니다.
};
const sess = session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    cookie: cookieOptions,
    store: sessionStore
});
app.use(sess)
io.use(sharedsession(sess, { autoSave: true }));


// app.use(function(req, res, next) {
//     console.log(req.url);
//     if (req.session.isLogined || req.url.indexOf('/auth') > -1) {
//         next();
//     } else {
//         res.status(403).json({ error: '로그인이 필요합니다!' });
//     }
// });