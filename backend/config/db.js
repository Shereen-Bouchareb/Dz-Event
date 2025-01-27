const mysql = require('mysql2/promise');
require('dotenv').config({ path: '../.env' });


const DATABASE_URL = process.env.DATABASE_URL || 'mysql://sql7759810:yMD1NuZE4l@sql7.freesqldatabase.com:3306/sql7759810';


const db = mysql.createPool({
  uri: DATABASE_URL,
  connectionLimit: 10, 
});

// Test the connection
(async () => {
  try {
    const connection = await db.getConnection();
    console.log('Database connection successful!');
    connection.release(); 
  } catch (err) {
    console.error('Database connection failed:', err.message);
  }
})();

module.exports = db;
