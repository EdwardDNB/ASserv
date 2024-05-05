const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {secretKey, salt} = require("../secret");



exports.register=async (req, res) => {
    try {
        const {id,firstName, lastName,photo, patronymic, phone, mail, password,registrationDate} = req.body;
        const existingUser = await User.findOne({ $or: [{ phone }, { mail }] });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this phone or email already exists' });
        }
        // Хешируем пароль перед сохранением в базу данных
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            id,
            firstName,
            lastName,
            patronymic,
            phone,
            mail,
            photo,
            password: hashedPassword,
            registrationDate
        });
        await newUser.save();
        res.status(201).json({message: 'User registered successfully'});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}


exports.login = async (req, res) => {
    try {
        const { phone, mail, password } = req.body;
        let user;
        if (phone) {
            user = await User.findOne({ phone });
        } else if (mail) {
            user = await User.findOne({ mail });
        } else {
            return res.status(400).json({ error: 'Phone or email is required' });
        }
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }
        // Проверяем соответствие пароля хешированному паролю в базе данных
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }
        // Генерация JWT токена
        const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' },null);
        res.json({ token, user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.logout = async (req, res) => {
    try {
        // Просто удаляем токен, предполагая, что клиент удалит его из localStorage или куки
        res.clearCookie('token'); // Очищаем токен из куки (если он хранится там)
        res.status(200).json({ message: 'Вы успешно разлогинились' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
