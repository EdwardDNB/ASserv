const express = require('express');
const router = express.Router();
const {addPhone,getAllPhones,deletePhone,removeAllPhones,toggleCalled} = require('../controllers/phone-controller');

// POST /phones/add
router.post('/phones/add', addPhone);

// GET /phones
router.get('/phones/get-all', getAllPhones);

// DELETE /phones/:id
router.delete('/phones/remove-one/:id', deletePhone);

// DELETE /phones/remove-all
router.delete('/phones/remove-all', removeAllPhones);

// PUT /phones/toggle-called/:id
router.patch('/phones/toggle-called/:id', toggleCalled);

module.exports = router;
