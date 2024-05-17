const User = require("../models/user");
const Order = require("../models/order");


// Middleware для проверки роли пользователя
exports.checkRole = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const user = await User.findOne({userId});

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        req.userRole = user?.role;
        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Middleware для проверки доступа к ордеру
exports.checkOrderAccess = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const userRole = req.userRole;
        const orderId = req.params.id;
        const order = await Order.findOne({orderId});

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        if (userRole !== 'manager' && order?.userId?.toString() !== userId) {
            return res.status(403).json({ error: 'Access denied' });
        }

        req.order = order;
        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};