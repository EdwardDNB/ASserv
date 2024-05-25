const User = require('../models/user');

// Получить всех пользователей или одного пользователя в зависимости от роли
exports.getUsers = async (req, res) => {
    try {
        const userId = req.user.id;
        const userRole = req.userRole;

        if (userRole === 'manager') {
            // Менеджер может видеть всех пользователей
            const users = await User.find();
            res.json(users);
        } else {
            // Клиент и сотрудник видят только свои данные
            const singleUser = [await User.findOne({id: userId})];
            res.json(singleUser);
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

// Обновить пользователя
exports.updateUser = async (req, res) => {
    try {
        const userRole = req.userRole;
        const userId = req.user.id;
        const user = await User.findOne({id: userId});
        const targetUserId = req.params.id;

        if (userRole !== 'manager' && user?.id.toString() !== targetUserId) {
            return res.status(403).json({error: 'Access denied'});
        }
        // Если пользователь не менеджер, удалить поле role из тела запроса
        if (userRole !== 'manager' && req.body.role) {
            delete req.body.role;
        }

        const updatedUser = await User.findOneAndUpdate({id: targetUserId}, req.body, {new: true});

        if (!updatedUser) {
            return res.status(404).json({error: 'User not found'});
        }

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};
