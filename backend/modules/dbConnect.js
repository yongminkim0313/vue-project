const mariadb = require('mariadb');
const mybatis = require('mybatis-mapper');
const path = require('path');
const mapperPath = path.join(__dirname, "../");

const pool = mariadb.createPool({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '!Yong1121',
    database: 'ymdb'
});

mybatis.createMapper([path.join(mapperPath, "/mapper/test.xml")]);
console.log("@@@@@@@@@@@", path.basename(mapperPath));

var query = mybatis.getStatement('tbBbs', 'selectTbBbs', { "name": "맘마" }, { language: 'sql', indent: '  ' });
console.log(query);

async function getList() {
    let conn, rows;
    try {
        conn = await pool.getConnection();
        conn.query('use test');
        rows = await conn.query(query);
        console.log(query);
    } catch (err) {
        console.log(err);
    } finally {
        if (conn) conn.end();
        return rows;
    }
}

module.exports = { getList }