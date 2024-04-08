const asyncHandler = require('express-async-handler');const Payment = require('../models/payment');
const Razorpay = require('razorpay');
const { KEY_ID, KEY_SECRET } = process.env;

var instance = new Razorpay({
  key_id: KEY_ID,
  key_secret: KEY_SECRET,
});
//@desc Get all payments
//@payment GET /api/payments
//@access Public
const getPayments = asyncHandler( async (req, res) => {
    const payments = await Payment.find({}).populate('bookingId');
    res.status(200).json({ message: "Success", payments });
});

//@desc Get payment by ID
//@payment GET /api/payments/:id
//@access Public
const getPayment = asyncHandler( async (req, res) => {
    const paymentId = req.params.id;
    const payment = await Payment.findOne({ _id: paymentId })
    .populate('bookingId');
    res.status(200).json({ message: "Success", payment });
});

//@desc Register payment
//@payment POST /api/payments
//@access Public
const createPayment = asyncHandler( async (req, res) => {
    const paymentData = req.body;
    const options = {
        amount: paymentData.amount * 100,
        currency: "INR",
        receipt: 'manojnj2309@gmail.com',
        payment_capture: 1,
    };
    instance.orders.create(options, async (err, order) => {
        if(err){
            return res.status(500).json({ message: "Error in creating order", error: err });
        }
        paymentData.transactionId = order.id;
        paymentData.status = "Success";
        paymentData.paymentMethod = "Razorpay";
        const data = await Payment.create(paymentData);
        res.status(200).json({ message: "Success", order, paymentData });
    });
});



module.exports = { getPayments, getPayment, createPayment };
