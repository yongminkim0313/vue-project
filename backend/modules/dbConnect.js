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
/*
console.log("mariadb", {
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});
*/
async function getList(mapperId, sqlId, param) {
    let conn, rows;
    try {
        conn = await pool.getConnection();
        var exeQuery = mapper.get(mapperId, sqlId, param);
        rows = await conn.query(exeQuery);
    } catch (err) {
        console.log('@@@@@@@@@@@ error @@@@:', err);
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
        console.log('@@@@@@@@@@@ error @@@@:', err);
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
        rows = await conn.query(exeQuery);
    } catch (err) {
        console.log('@@@@@@@@@@@ error @@@@:', err);
    } finally {
        if (conn) conn.end();
        return rows[0];
    }
}

async function delData(mapperId, sqlId, param) {
    let conn, rows;
    try {
        conn = await pool.getConnection();
        var exeQuery = mapper.get(mapperId, sqlId, param);
        rows = await conn.query(exeQuery);
    } catch (err) {
        console.log('@@@@@@@@@@@ error @@@@:', err);
    } finally {
        if (conn) conn.end();
        return true;
    }
}

module.exports = {
    getList: getList,
    setData: setData,
    getData: getData,
    delData: delData
}