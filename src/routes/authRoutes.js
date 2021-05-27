const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController')
router.post('/signUp', AuthController.registerNewUser);
router.post('/logIn', AuthController.logInUser);
module.exports = router;