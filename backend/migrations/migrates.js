const mysql = require('mysql2');
require('dotenv').config({ path: '../.env' }); 


const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});


const migrations = [
 
  // Example migration: create orders table 

    `DROP TABLE IF EXISTS availability`,
    `CREATE TABLE Availability (
        Dispo_id INT AUTO_INCREMENT PRIMARY KEY,
        date DATE NOT NULL,
        status ENUM('Available', 'Unavailable') NOT NULL,
        Prestataire_id INT NOT NULL,
        FOREIGN KEY (Prestataire_id) REFERENCES Prestataire(Prestataire_id) ON DELETE CASCADE
    )`,
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
