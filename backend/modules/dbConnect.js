const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: '128.1.1.10',
    port: '3306',
    user: 'root',
    password: '1234',
    database: 'test'
});

async function getList() {
    let conn, rows;
    try {
        conn = await pool.getConnection();
        conn.query('use test');
        rows = await conn.query('select * from TB_BBS');
    } catch (err) {
        console.log(err);
    } finally {
        if (conn) conn.end();
        return rows;
    }
}

module.exports = { getList }