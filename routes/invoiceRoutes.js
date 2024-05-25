// routes/invoiceRoutes.js
const express = require('express');
const router = express.Router();
const {createInvoice, updateInvoice, deleteInvoice, markInvoiceAsPaid, getInvoices} = require('../controllers/invoiceController');
const {checkRole} = require('../middlewares/auth');
const {verifyToken} = require('../verifyToken');

router.post('/invoices', verifyToken, checkRole, createInvoice);
router.get('/invoices', verifyToken, checkRole, getInvoices);
router.put('/invoices/:id', verifyToken, checkRole, updateInvoice);
router.delete('/invoices/:id', verifyToken, checkRole, deleteInvoice);
router.patch('/invoices/:id/pay', verifyToken, checkRole, markInvoiceAsPaid);

module.exports = router;
