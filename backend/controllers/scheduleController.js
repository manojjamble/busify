const asyncHandler = require('express-async-handler');const Schedule = require('../models/schedule');

//@desc Get all schedules
//@schedule GET /api/schedules
//@access Public
const getSchedules = asyncHandler( async (req, res) => {
    const schedules = await Schedule.find({})
    .populate('routeId')
    .populate('busId');
    res.status(200).json({ message: "Success", schedules });
});

//@desc Get schedule by ID
//@schedule GET /api/schedules/:id
//@access Public
const getSchedule = asyncHandler( async (req, res) => {
    const scheduleId = req.params.id;
    const schedule = await Schedule.findOne({ _id: scheduleId })
    .populate('routeId')
    .populate('busId');
    res.status(200).json({ message: "Success", schedule } );
});

//@desc Register schedule
//@schedule POST /api/schedules
//@access Public
const createSchedule = asyncHandler( async (req, res) => {
    const newSchedule = req.body;
    const schedule = await Schedule.create(newSchedule);
    res.status(200).json({ message: "Success", schedule });
});

//@desc Update schedule
//@schedule PUT /api/schedules/:id
//@access Public
const updateSchedule = asyncHandler( async (req, res) => {
    const scheduleId = req.params.id;
    const updatedSchedule = req.body;
    const schedule = await Schedule.findOneAndUpdate(
        { _id: scheduleId},
        updatedSchedule,
        { new: true });
    res.status(200).json({ message: "Success", schedule });
});

//@desc Delete schedule
//@schedule DELETE /api/schedules/:id
//@access Public
const deleteSchedule = asyncHandler( async (req, res) => {
    try{
        const scheduleId = req.params.id;
        await Schedule.findOneAndDelete({ _id: scheduleId });
        res.status(200).json({ message: "Success" });
    }catch(err){
        res.status(400).json({ message: "Error", error: err });
    }
});

module.exports = { getSchedules, getSchedule, createSchedule, updateSchedule, deleteSchedule };