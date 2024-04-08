const express = require('express');
const router = express.Router();
const {getRoutes, getRoute, createRoute, updateRoute, deleteRoute} = require('../controllers/routeController');
const validateToken = require('../middleware/validateTokenHandler');

router.use(validateToken);
router.get('/', getRoutes);
router.get('/:id', getRoute);
router.post('/', createRoute);
router.put('/:id', updateRoute);
router.delete('/:id', deleteRoute);

module.exports = router;
