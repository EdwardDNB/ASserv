const express = require('express');
const router = express.Router();
const {logout, login,register,getUserById} = require('../controllers/authController');
const {verifyToken} = require("../verifyToken");
// Регистрация пользователя
router.post('/register', register);

// Вход пользователя
router.post('/login', login);


// Роут для логаута
router.post('/logout',verifyToken, logout);

// Роут для верификации пользователя
router.get('/verify', verifyToken, getUserById);

module.exports = router;
