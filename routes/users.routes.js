const express = require('express');
const router = express.Router();

const UserController = require('../controllers/users.controller');

router.get('/users', UserController.getUsers);
router.get('/users/:id', UserController.getId);

module.exports = router;