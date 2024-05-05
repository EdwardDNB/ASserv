const {secretKey} = require("./secret");

const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Отсутствует токен авторизации' });
    }
    jwt.verify(token, secretKey,null, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Недействительный токен авторизации' });
        }
        // Если токен валиден, сохраните информацию о пользователе в req.user в данном случае у нас в токене лежит айди
        req.user = decoded;
        next();
    });
};
