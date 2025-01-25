const mysql = require('mysql2');
require('dotenv').config({ path: '../.env' }); 


const db = mysql.createPool({   
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 10
});

db.getConnection((err, connection) => {
    if (err) {
        console.error('Database connection failed:', err.message);
    } else {
        console.log('Database connection successful!');
        connection.release();
    }
});

module.exports = db;


