const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, default: "" },
    patronymic: { type: String , default: "" },
    phone: { type: String, required: true, unique: true },
    photo: { type: String, default: "" },
    id: { type: String, required: true, unique: true },
    mail: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    registrationDate: { type: Date, default: Date.now },
    role: { type: String, enum: ["manager", "customer", "staff"], default: "customer" },
    // Інші поля за необхідності
});

const User = mongoose.model('User', userSchema);

module.exports = User;
