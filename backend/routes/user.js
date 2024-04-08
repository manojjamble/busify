const express = require('express');
const router = express.Router();
const {getUsers, loginUser, getUser, createUser, updateUser, deleteUser} = require('../controllers/userController');
const validateToken = require('../middleware/validateTokenHandler');

router.post('/login', loginUser);
router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.use(validateToken); 
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;

