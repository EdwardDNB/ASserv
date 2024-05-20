const mongoose = require('mongoose');
const { v4: uuid } = require('uuid');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, default: "" },
    patronymic: { type: String, default: "" },
    phone: { type: String, required: true, unique: true },
    photo: { type: String, default: "" },
    id: { type: String, required: true, unique: true, default: uuid },
    mail: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    registrationDate: { type: Date, default: Date.now },
    role: { type: String, enum: ["manager", "customer", "staff"], default: "customer" },
});

// Pre-save hook to ensure `id` is generated if not provided
userSchema.pre('save', function(next) {
    if (!this.id) {
        this.id = uuid();
    }
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
