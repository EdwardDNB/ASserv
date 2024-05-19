const express = require('express');
const router = express.Router();
const {getOrders,addOrder,updateOrder,deleteOrder} = require('../controllers/orderController');
const { verifyToken } = require('../verifyToken');
const { checkRole, checkOrderAccess } = require('../middlewares/auth');

router.get('/orders', verifyToken, checkRole, getOrders);
router.post('/orders', verifyToken, addOrder);
router.put('/orders/:id', verifyToken, checkRole, checkOrderAccess, updateOrder);
router.delete('/orders/:id', verifyToken, checkRole, checkOrderAccess, deleteOrder);

module.exports = router;
