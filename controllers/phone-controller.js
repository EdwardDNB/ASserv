// controllers/phoneController.js
const Phone = require('../models/phone');

exports.addPhone = async (req, res) => {
    try {
        const { id, number, date, called } = req.body;
        const newPhone = new Phone({ id, number, date, called });
        await newPhone.save();
        res.status(201).json(newPhone);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllPhones = async (req, res) => {
    try {
        const phones = await Phone.find();
        res.json(phones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deletePhone = async (req, res) => {
    try {
        const phone = await Phone.findOne({id:req.params.id});
        if (!phone) {
            return res.status(404).json({ error: 'Phone not found' });
        }
        await Phone.deleteOne({ _id: phone._id });
        res.json({ message: 'Phone deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.removeAllPhones = async (req, res) => {
    try {
        await Phone.deleteMany({});
        res.json({ message: 'All phones deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.toggleCalled = async (req, res) => {
    try {
        const phone = await Phone.findOne({id:req.params.id});
        if (!phone) {
            return res.status(404).json({ error: 'Phone not found' });
        }
        phone.called = !phone.called;
        await phone.save();
        res.json(phone);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
