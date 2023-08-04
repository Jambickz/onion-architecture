const { createContainer, asClass, asValue, asFunction } = require('awilix');
const UserController = require("../../api/user/controller");
const UserService = require("../../../application/user.service");
const UserRepository = require("../../db/user/repository");
const UserMapper = require("../../db/user/mapper");
const UserRouter = require('../../api/user/router');

const container = createContainer();



container.register({
	UserService: asValue(UserService),
	UserRepository: asValue(UserRepository),
	dbConfig: asValue({
		host: 'localhost',
		user: 'admin',
		password: '1231231234',
		database: 'learn_database',
	}),
});


container.register({
	UserController: asClass(UserController).singleton(),
	UserService: asClass(UserService).singleton(),
	UserRepository:asClass(UserRepository).singleton(),
	userRouter: asFunction(UserRouter).singleton(),
	UserMapper: asClass(UserMapper).singleton(),
});





module.exports = container;
