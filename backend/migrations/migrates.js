const mysql = require('mysql2');

require('dotenv').config();  // No need to specify path if the .env file is in the root directory.
require('dotenv').config({ path: '../.env' }); 



const connection = mysql.createConnection({
  
 host: 'localhost',
 user: 'chirine',
 password: '6hpqyuFd',
 database: 'dz-event',
 
});


const migrations = [
  // Drop the `reserver` table if it exists
  `RENAME TABLE reservationfrom TO reservationform`,
  

];

async function applyMigrations() {
  try {
    for (let query of migrations) {
      await runQuery(query);
    }
    console.log('Migrations applied successfully');
  } catch (error) {
    console.error('Error applying migrations:', error);
  } finally {
    connection.end();
  }
}

function runQuery(query) {
  return new Promise((resolve, reject) => {
    connection.query(query, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
}

applyMigrations();
