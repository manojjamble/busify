const express = require('express');
const router = express.Router();
const {getPayments, getPayment, createPayment, updatePayment, deletePayment} = require('../controllers/paymentController');
const validateToken = require('../middleware/validateTokenHandler');

router.use(validateToken);
router.get('/', getPayments);
router.get('/:id', getPayment);
router.post('/', createPayment);

module.exports = router;
