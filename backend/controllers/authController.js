const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userQueries = require('../models/authModel');

// Sign up for a Prestataire
exports.signupPrestataire = async (req, res) => {
   // console.log(req.body);
    const { email, password, firstname, familyname, userBio, jobDescription, role } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await userQueries.checkUserExists(email, 'prestataire');
        if (existingUser && existingUser.length > 0) {
            console.log('Prestataire already exists');
            return res.status(400).json({ error: "Prestataire already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user into the prestataire table
        await userQueries.insertPrestataire(email, hashedPassword, firstname, familyname, userBio, jobDescription, role);
        res.status(201).json({ message: "Prestataire registered successfully" });
    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
};

// Sign up for a Client
exports.signupClient = async (req, res) => {
    const { email, password, firstName, familyName } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await userQueries.checkUserExists(email, 'client');
        if (existingUser && existingUser.length > 0) {
            return res.status(400).json({ error: "Client already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user into the client_users table
        await userQueries.insertClient(email, hashedPassword, firstName, familyName);
        res.status(201).json({ message: "Client registered successfully" });
    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
};

// Login for both Prestataire and Client
exports.login = async (req, res) => {

    const { email, password, userType } = req.body;

    let user;
    try {
        if (userType === 'prestataire') {
            // Get the prestataire data from the prestataire table
            user = await userQueries.getPrestataireByEmail(email);
        } else {
            // Get the client data from the client_users table
            user = await userQueries.getClientByEmail(email);
        }

        if (!user || user.length === 0) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Check if the password matches
        const isPasswordValid = await bcrypt.compare(password, user[0].password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Create a JWT token with the user type and other details
        const token = jwt.sign(
            { id: user[0].Prestataire_id || user[0].client_id, userType: userType },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
};
