// models/invoice.js
const mongoose = require('mongoose');
const { v4: uuid } = require('uuid');
const { Schema } = mongoose;

const invoiceSchema = new Schema({
    id: { type: String, required: true, unique: true },
    userId: {type: String, required: true},
    firstName: { type: String, required: true },
    lastName: { type: String, default: "" },
    patronymic: { type: String, default: "" },
    orderId: { type: String, required: true },
    carBrand: { type: String, required: true },
    carModel: { type: String, required: true },
    licensePlate: { type: String, required: true },
    serviceType: { type: String, required: true },
    desiredDate: { type: String, required: true },
    desiredTime: { type: String, required: true },
    comments: { type: String, default: '' },
    phoneNumber: { type: String, required: true },
    tasks: [
        {
            id: { type: String, required: true },
            title: { type: String, required: true },
            supplies: { type: String, default: "Add supplies" },
            suppliesCost: { type: Number, default: 0 }
        }
    ],
    workCost: { type: Number},
    totalCost: { type: Number, required: true },
    paymentDone: { type: Boolean, default: false }
}, { timestamps: true });
// Pre-save hook to ensure `id` is generated if not provided
invoiceSchema.pre('save', function(next) {
    if (!this.id) {
        this.id = uuid();
    }
    next();
});
const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
