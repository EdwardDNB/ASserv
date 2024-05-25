const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    orderId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    supplies: {
        type: String,
        default: "Add supplies",
    },
    suppliesCost: {type: Number, default: 0},
    isDone: {
        type: Boolean,
        required: true,
        default: false,
    }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
