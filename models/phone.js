
const mongoose = require('mongoose');

const phoneSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    number: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    called: {
        type: Boolean,
        required: true,
    },
});

const Phone = mongoose.model('Phone', phoneSchema);

module.exports = Phone;
