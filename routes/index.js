//endpoints

const express = require('express');
const router= express.Router();
const userController = require('../controllers/userController');

//endpoint to handle employees data retrieval
router.get('/users', userController.getAllUsers);
router.get('/hello', userController.getHelloWorld);
router.get('/users/:search', userController.getUserByIpOrEmail);
router.post('/users',userController.createUser);
router.put('/users',userController.updateUser);
router.delete('/users',userController.deleteUser);

module.exports = router;