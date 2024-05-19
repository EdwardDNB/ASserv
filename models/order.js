// models/order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    id: {type: String, required: true, unique: true},
    carBrand: {type: String, required: true},
    carModel: {type: String, required: true},
    licensePlate: {type: String, required: true},
    serviceType: {type: String, required: true},
    desiredDate: {type: String, required: true},
    desiredTime: {type: String, required: true},
    comments: {type: String, default: ''},
    phoneNumber: {type: String, required: true},
}, {timestamps: true});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
