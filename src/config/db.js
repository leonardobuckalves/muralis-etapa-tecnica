const mysql = require('mysql2');

var pool = mysql.createPool({
    "user": "root",
    "password": "root",
    "database": "gerenciadordespesas",
    "host": "localhost",
    "port": "3307"
});

exports.pool = pool;