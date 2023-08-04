const container = require("../../config/di/container");

class UserController {
	constructor({ UserService }) {
		this.UserService = UserService
	}
	
	async getUser(req, res) {
		try {
			let users
			if (req.params.id) users = await this.UserService.getUser(req.params.id)
			else users = await this.UserService.getUsers()
			res.success(users)
		} catch (err) {
			console.error('Error while fetching users:', err)
			res.error(500, null, 'Internal Server Error')
		}
	}
	
	async createUser(req, res) {
		try {
			const { name, email } = req.body
			const user = await this.UserService.createUser(name, email)
			res.success(user)
		} catch (err) {
			console.error('Error while creating user:', err)
			res.error(500, null, 'Internal Server Error')
		}
	}
	
	async updateUser(req, res) {
		try {
			const { id } = req.params
			const { name, email } = req.body
			const updatedUser = await this.UserService.updateUser(id, name, email)
			res.success(updatedUser)
		} catch (err) {
			console.error('Error while updating user:', err)
			res.error(500, null, 'Internal Server Error')
		}
	}
	
	async removeUser(req, res) {
		try {
			const { id } = req.params
			const isDeleted = await this.UserService.removeUser(id)
			if (isDeleted) res.success(null, 'User deleted successfully')
			else res.error(404, null, 'User not found')
		} catch (err) {
			console.error('Error while deleting user:', err)
			res.error(500, null, 'Internal Server Error')
		}
	}
}

module.exports = UserController;
