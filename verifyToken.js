const {secretKey} = require("./secret");

const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    let token = req.headers.authorization;     token = removeBearerPrefix(token);
     if (!token) {
        return res.status(401).json({ message: 'Отсутствует токен авторизации' });
    }
    jwt.verify(token, secretKey,{ algorithms: ['HS256'] }, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Недействительный токен авторизации' });
        }
        // Если токен валиден, сохраните информацию о пользователе в req.user в данном случае у нас в токене лежит айди
        req.user = decoded;

        next();
    });
};
function removeBearerPrefix(token) {
    // Проверяем, начинается ли строка с префикса "Bearer "
    if (token.startsWith("Bearer ")) {
        // Если да, то удаляем префикс и возвращаем оставшуюся часть
        return token.slice(7);
    } else {
        // Если префикс отсутствует, возвращаем исходный токен без изменений
        return token;
    }
}