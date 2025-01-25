const db = require('../config/db');

const checkUserExists = async (email, userType) => {
    let query;
    if (userType === 'prestataire') {
        query = "SELECT * FROM prestataire WHERE Gmail_ad = ?";
    } else {
        query = "SELECT * FROM client WHERE GmailAd = ?";
    }

    try {
        const [user] = await db.query(query, [email]);  // Using await here
        return user;
    } catch (error) {
        throw new Error("Database query failed: " + error.message);
    }
};



const insertPrestataire = async (email, hashedPassword, firstname, familyname, userBio, jobDescription, role ,wilaya) => {
    const query = "INSERT INTO prestataire (Gmail_ad, password, firstname, familyname, userBio, Job_description, role ,wilaya) VALUES (?, ?, ?, ?, ?, ?, ?,?)";
    try {
        await db.query(query, [email, hashedPassword, firstname, familyname, userBio, jobDescription, role,wilaya]);
    } catch (error) {
        throw new Error("Database query failed: " + error.message);
    }
};

const insertClient = async (email, hashedPassword, firstName, familyName) => {
    const query = "INSERT INTO client (GmailAd, password, firstName, familyName) VALUES (?, ?, ?, ?)";
    try {
        await db.query(query, [email, hashedPassword, firstName, familyName]);
    } catch (error) {
        throw new Error("Database query failed: " + error.message);
    }
};

// Get prestataire data based on the email
const getPrestataireByEmail = async (email) => {
    const query = "SELECT * FROM prestataire WHERE Gmail_ad = ?";
    try {
        const [user] = await db.query(query, [email]);
        return user;
    } catch (error) {
        throw new Error("Database query failed: " + error.message);
    }
};

// Get client data based on the email
const getClientByEmail = async (email) => {
    const query = "SELECT * FROM client WHERE GmailAd = ?";
    try {
        const [user] = await db.query(query, [email]);
        return user;
    } catch (error) {
        throw new Error("Database query failed: " + error.message);
    }
};

module.exports = {
    checkUserExists,
    insertPrestataire,
    insertClient,
    getPrestataireByEmail,
    getClientByEmail
};
