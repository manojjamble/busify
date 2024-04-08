const asyncHandler = require('express-async-handler');const Bus = require('../models/bus');

//@desc Get all buss
//@bus GET /api/buss
//@access Public
const getBuses = asyncHandler( async (req, res) => {
    const busData = await Bus.find({})
    .populate('bookings')
    .populate('schedule')
    .populate('route');
    res.status(200).json({ message: "Success", busData } );
});

//@desc Get bus by ID
//@bus GET /api/buss/:id
//@access Public
const getBus = asyncHandler( async (req, res) => {
    const busId = req.params.id;
    const bus = await Bus.findOne({ _id: busId})
    .populate('bookings')
    .populate('schedule')
    .populate('route');
    res.status(200).json({ message: "Success", bus } );
});

//@desc Register bus
//@bus POST /api/bus
//@access Public
const createBus = asyncHandler( async (req, res) => {
    if(!req.user.role == 'admin') {
        res.status(401);
        throw new Error('Not authorized');
    }

    const newBus = req.body;
    const bus = await Bus.create(newBus);
    res.status(200).json({ message: "Success", bus } );
});

//@desc Update bus
//@bus PUT /api/buss/:id
//@access Public
const updateBus = asyncHandler( async (req, res) => {
    try{
        if(!req.user.role == 'admin') {
            res.status(401);
            throw new Error('Not authorized');
        }

        const busId = req.params.id;
        const updatedBus = req.body;
        const bus = await Bus.findOneAndUpdate(
            { _id: busId},
            updatedBus,
            { new: true }
        );
        res.status(200).json({ message: "Success", bus } );
    }catch(err){
        res.status(400).json({ message: "Failed", error: err.message } );
    }    
});

//@desc Delete bus
//@bus DELETE /api/buss/:id
//@access Public
const deleteBus = asyncHandler( async (req, res) => {
    try{
        if(!req.user.role == 'admin') {
            res.status(401);
            throw new Error('Not authorized');
        }

        const busId = req.params.id;
        const bus = await Bus.findOneAndDelete({ _id: busId});
        res.status(200).json({ message: "Success", bus } );
    }catch(err){
        res.status(400).json({ message: "Failed", error: err.message } );
    }
});

module.exports = { getBuses, getBus, createBus, updateBus, deleteBus };
