// controllers/invoiceController.js
const Invoice = require('../models/invoice');
const Order = require('../models/order');
const Task = require('../models/tasks');
const { v4: uuid } = require('uuid');
const User = require("../models/user");


exports.getInvoices = async (req, res) => {
    try {
        const userId = req.user.id;
        const userRole = req.userRole;

        if (userRole === 'manager' || userRole === 'staff') {
            // Менеджер может видеть всех
            const invoices = await Invoice.find();
            res.json(invoices);
        } else {
            // Клиент только свои
            const userInvoices = await Invoice.find({userId});
            if (!userInvoices) {
                return res.status(404).json({error: 'Invoices not found'});
            }

            res.json(userInvoices);
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

// Create a new invoice
exports.createInvoice = async (req, res) => {
    try {
        const userRole = req.userRole;
        if (userRole !== 'manager') {
            return res.status(403).json({error: 'Access denied'});
        }
        const {orderId, workCost} = req.body;

        const order = await Order.findOne({id: orderId});
        if (!order) {
            return res.status(404).json({error: 'Order not found'});
        }
        const {
            userId,
            carBrand,
            carModel,
            licensePlate,
            serviceType,
            desiredDate,
            desiredTime,
            comments,
            phoneNumber
        } = order


        const tasks = await Task.find({orderId, isDone: true});
        if (!tasks) {
            return res.status(404).json({error: 'Tasks not found'});
        }
        const user = await User.findOne({id:userId});
        if (!user) {
            return res.status(404).json({error: 'User not found'});
        }
        const{firstName,lastName}=user


        // Привести значения к числу и посчитать общую стоимость supplies
        const totalSuppliesCost = tasks.reduce((acc, task) => acc + (Number(task.suppliesCost) || 0), 0);
        const workCostNumber = Number(workCost) || 0;
        const totalCost = totalSuppliesCost + workCostNumber;

        const newInvoice = new Invoice({
            id: uuid(),
            userId,
            orderId,
            firstName,
            lastName,
            carBrand,
            carModel,
            licensePlate,
            serviceType,
            desiredDate,
            desiredTime,
            comments,
            phoneNumber,
            tasks: tasks?.map(task => ({
                id: task.id,
                title: task.title,
                supplies: task.supplies,
                suppliesCost: task.suppliesCost
            })),
            workCost,
            totalCost,
            paymentDone: false
        });

        await newInvoice.save();
        res.status(201).json(newInvoice);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

// Update an invoice
exports.updateInvoice = async (req, res) => {
    try {
        const userRole = req.userRole;
        if (userRole !== 'manager') {
            return res.status(403).json({error: 'Access denied'});
        }
        const {id} = req.params;
        const updatedData = req.body;

        const invoice = await Invoice.findOne({id});
        if (!invoice) {
            return res.status(404).json({error: 'Invoice not found'});
        }
        const totalSuppliesCost = updatedData.tasks.reduce((acc, task) => acc + Number(task.suppliesCost || 0), 0);
        const totalCost = Number(totalSuppliesCost) + Number(updatedData.workCost || 0);
        const updatedDataTotalCost = {...updatedData, totalCost}

        const updatedInvoice = await Invoice.findOneAndUpdate({id}, updatedDataTotalCost, {new: true});


        res.json(updatedInvoice);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

// Delete an invoice
exports.deleteInvoice = async (req, res) => {
    try {
        const userRole = req.userRole;
        if (userRole !== 'manager') {
            return res.status(403).json({error: 'Access denied'});
        }
        const {id} = req.params;

        const deletedInvoice = await Invoice.findOneAndDelete({id});
        if (!deletedInvoice) {
            return res.status(404).json({error: 'Invoice not found'});
        }

        res.json({message: 'Invoice deleted successfully'});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

// Mark an invoice as paid
exports.markInvoiceAsPaid = async (req, res) => {
    try {
        const userRole = req.userRole;
        if (userRole !== 'manager') {
            return res.status(403).json({error: 'Access denied'});
        }
        const {id} = req.params;
        const {paymentDone} = req.body;

        const updatedInvoice = await Invoice.findOneAndUpdate({id}, {paymentDone}, {new: true});
        if (!updatedInvoice) {
            return res.status(404).json({error: 'Invoice not found'});
        }

        res.json(updatedInvoice);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};
