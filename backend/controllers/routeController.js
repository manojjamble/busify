const asyncHandler = require('express-async-handler');const Route = require('../models/route');

//@desc Get all routes
//@route GET /api/routes
//@access Public
const getRoutes = asyncHandler( async (req, res) => {
    const routeData = await Route.find({})
    .populate('buses');
    res.status(200).json({ message: "Success", routeData } );
});

//@desc Get route by ID
//@route GET /api/routes/:id
//@access Public
const getRoute = asyncHandler( async (req, res) => {
    const routeId = req.params.id;
    const route = await Route.findOne({ _id: routeId});
    res.status(200).json({ message: "Success", route } );
});

//@desc Register route
//@route POST /api/routes
//@access Public
const createRoute = asyncHandler( async (req, res) => {
    const newRoute = req.body;
    const route = await Route.create(newRoute);
    res.status(200).json({ message: "Success", route });
});

//@desc Update route
//@route PUT /api/routes/:id
//@access Public
const updateRoute = asyncHandler( async (req, res) => {
    const routeId = req.params.id;
    const updatedRoute = req.body;
    const route = await Route.findOneAndUpdate(
        { _id: routeId}, 
        updatedRoute, 
        { new: true });
    res.status(200).json({ message: "Success", route });
});

//@desc Delete route
//@route DELETE /api/routes/:id
//@access Public
const deleteRoute = asyncHandler( async (req, res) => {
    const routeId = req.params.id;
    await Route.findOneAndDelete({ _id: routeId });
    res.status(200).json({ message: "Success" });
});

module.exports = { getRoutes, getRoute, createRoute, updateRoute, deleteRoute };


