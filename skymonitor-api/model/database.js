const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'skymonitor'
});

/* try {
    connection.connect();
} catch (error) {
    console.log("[MYSQL] Can't connect to database.");
    throw error;
} */

module.exports = pool;