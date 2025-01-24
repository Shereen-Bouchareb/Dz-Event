
const express = require("express");
const router = express.Router();
const reservationsController = require("../controllers/reservationsController");
//const authenticateToken = require("../middleware/authenticateToken");
//const authorizeRole = require("../middleware/authorizeRole");

// Route pour créer une réservation
router.post("/", reservationsController.creerReservation);

// Route pour mettre à jour l'état de la réservation
//router.put("/:id", authenticateToken, authorizeRole(["prestataire"]),reservationsController.updateEtatReservation);
router.put("/status/:id", reservationsController.updateEtatReservation);


module.exports = router;