const Order = require('../models/order');

// Получить все ордера
exports.getOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const userRole = req.userRole;

        if (userRole === 'manager') {
            // Менеджер может видеть все ордера
            const orders = await Order.find();
            res.json(orders);
        } else {
            // Клиент видит только свои ордера
            const orders = await Order.find({ userId });
            res.json(orders);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Добавить новый ордер
exports.addOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        const newOrder = new Order({
            ...req.body,
            userId
        });
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Обновить ордер
exports.updateOrder = async (req, res) => {
    try {
        const order = req.order;
        const updatedOrder = await Order.findOneAndUpdate({id:order.id}, req.body, { new: true });
        res.json(updatedOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Удалить ордер
exports.deleteOrder = async (req, res) => {
    try {
        const order = req.order;
        await Order.findOneAndDelete({id:order.id});
        res.json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
