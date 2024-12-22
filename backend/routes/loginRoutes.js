const express = require('express');
const router = express.Router();
const UserController = require('../controllers/loginController');

router.post('/login', UserController.loginHandler);

module.exports = router;