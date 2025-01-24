const express = require("express");
const { envoyerDemandeDevis } = require("../controllers/demandeController");

const router = express.Router();

// Route pour traiter une demande de devis
router.post("/demande-devis", envoyerDemandeDevis);

module.exports = router;
