const mariadb = require('mariadb');
const mapper = require('./mapperConfig');
const winston = require('./winstonConfig');

const pool = mariadb.createPool({
    host: '128.1.1.10',
    port: '3306',
    user: 'root',
    password: '1234',
    database: 'test'
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
        console.log(err);
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
        console.log(err);
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