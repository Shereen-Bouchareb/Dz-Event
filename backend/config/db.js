const mysql = require('mysql2/promise');
require('dotenv').config({ path: '../.env' });


const DATABASE_URL = process.env.DATABASE_URL || 'mysql://chirine:6hpqyuFd@localhost:3306/dz-event';


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
