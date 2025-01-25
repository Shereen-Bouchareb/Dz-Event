const express = require("express");
const router = express.Router();
const emailController = require("../controllers/emailController");

// Route POST pour envoyer un email
router.post("/envoyer-email", emailController.envoyerEmail);

module.exports = router;
