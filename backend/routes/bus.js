const express = require('express');
const router = express.Router();
const {getBuses, getBus, createBus, updateBus, deleteBus} = require('../controllers/busController');
const validateToken = require('../middleware/validateTokenHandler');

router.use(validateToken);
router.get('/', getBuses);
router.get('/:id', getBus);
router.post('/', createBus);
router.put('/:id', updateBus);
router.delete('/:id', deleteBus);

module.exports = router;
