const express = require('express');
const router = express.Router();
const {logout, login,register} = require('../controllers/authController');
const {verifyToken} = require("../verifyToken");
// Регистрация пользователя
router.post('/register', register);

// Вход пользователя
router.post('/login', login);


// Роут для логаута
router.post('/logout',verifyToken, logout);



module.exports = router;
