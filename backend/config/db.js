const mysql = require('mysql2/promise'); 
require('dotenv').config({ path: '../.env' }); 


const db = mysql.createPool({   
    host: "localhost",
    user: "root",
    password:"linda",
    database: "calendrier",
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



