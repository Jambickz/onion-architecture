const express = require('express');
const router = express.Router();

module.exports = ({ UserController }) => {
	router.get('/user/:id', UserController.getUser.bind(UserController))
	router.get('/user', UserController.getUser.bind(UserController))
	router.post('/user/create', UserController.createUser.bind(UserController))
	router.put('/user/:id', UserController.updateUser.bind(UserController))
	router.delete('/user/:id', UserController.removeUser.bind(UserController))
	return router;
};
