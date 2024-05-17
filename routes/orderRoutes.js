const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { verifyToken } = require('../verifyToken');
const { checkRole, checkOrderAccess } = require('../middlewares/auth');

router.get('/orders', verifyToken, checkRole, orderController.getOrders);
router.post('/orders', verifyToken, orderController.addOrder);
router.put('/orders/:id', verifyToken, checkRole, checkOrderAccess, orderController.updateOrder);
router.delete('/orders/:id', verifyToken, checkRole, checkOrderAccess, orderController.deleteOrder);

module.exports = router;
