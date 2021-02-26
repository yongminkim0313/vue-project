const mariadb = require('mariadb');
const mapper = require('./mapperConfig');
const winston = require('./winstonConfig');

const pool = mariadb.createPool({
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});
console.log("mariadb", {
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});
var query = mapper.get('userMapper', 'selectUser', { "test_id": "111" });


async function getList() {
    let conn, rows;
    try {
        conn = await pool.getConnection();
        //conn.query('use test');
        rows = await conn.query('select * from TB_BBS');
    } catch (err) {
        console.log(err);
    } finally {
        if (conn) conn.end();
        return rows;
    }
}

async function setData(mapperId, sqlId, param) {
    let conn, rows;
    try {
        conn = await pool.getConnection();
        var exeQuery = mapper.get(mapperId, sqlId, param);
        rows = await conn.query(exeQuery);
    } catch (err) {
        throw Error("setData Error");
    } finally {
        if (conn) conn.end();
        return rows;
    }
}


async function getData(mapperId, sqlId, param) {
    let conn, rows;
    try {
        conn = await pool.getConnection();
        var exeQuery = mapper.get(mapperId, sqlId, param);
        console.log(exeQuery);
        rows = await conn.query(exeQuery);
    } catch (err) {
        throw Error("getData Error");
    } finally {
        if (conn) conn.end();
        return rows[0];
    }
}

module.exports = {
    getList: getList,
    setData: setData,
    getData: getData
}