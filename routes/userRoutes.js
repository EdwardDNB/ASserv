const express = require('express');
const router = express.Router();
const {getUsers, updateUser} = require('../controllers/userController');
const {verifyToken} = require('../verifyToken');
const {checkRole} = require("../middlewares/auth");

// Роут для получения пользователей
router.get('/users', verifyToken,checkRole, getUsers);

// Роут для обновления пользователя
router.put('/users/:id', verifyToken,checkRole, updateUser);

module.exports = router;
