const pool = require("../config/db");
const db = pool;

const checkUserExists = async (email, userType) => {
  let query;
  if (userType === "prestataire") {
    query = "SELECT * FROM prestataire WHERE Gmail_ad = $1";
  } else {
    query = "SELECT * FROM client WHERE GmailAd = $1";
  }

  try {
    const res = await db.query(query, [email]); // Use $1 for parameterized queries in PostgreSQL
    return res.rows[0]; // Return the first row if user exists
  } catch (error) {
    throw new Error("Database query failed: " + error.message);
  }
};

const insertPrestataire = async (
  email,
  hashedPassword,
  firstname,
  familyname,
  userBio,
  jobDescription,
  role,
  wilaya
) => {
  const query =
    "INSERT INTO prestataire (Gmail_ad, password, firstname, familyname, userBio, job_description, role, wilaya) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)";
  try {
    await db.query(query, [
      email,
      hashedPassword,
      firstname,
      familyname,
      userBio,
      jobDescription,
      role,
      wilaya,
    ]);
  } catch (error) {
    throw new Error("Database query failed: " + error.message);
  }
};

const insertClient = async (email, hashedPassword, firstName, familyName) => {
  const query =
    "INSERT INTO client (GmailAd, password, firstName, familyName) VALUES ($1, $2, $3, $4)";
  try {
    await db.query(query, [email, hashedPassword, firstName, familyName]);
  } catch (error) {
    throw new Error("Database query failed: " + error.message);
  }
};

// Get prestataire data based on the email
const getPrestataireByEmail = async (email) => {
  const query = "SELECT * FROM prestataire WHERE Gmail_ad = $1";
  try {
    const res = await db.query(query, [email]);
    return res.rows[0]; // Return the first row if user exists
  } catch (error) {
    throw new Error("Database query failed: " + error.message);
  }
};

// Get client data based on the email
const getClientByEmail = async (email) => {
  const query = "SELECT * FROM client WHERE GmailAd = $1";
  try {
    const res = await db.query(query, [email]);
    return res.rows[0]; // Return the first row if user exists
  } catch (error) {
    throw new Error("Database query failed: " + error.message);
  }
};

module.exports = {
  checkUserExists,
  insertPrestataire,
  insertClient,
  getPrestataireByEmail,
  getClientByEmail,
};
