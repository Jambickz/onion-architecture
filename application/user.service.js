const User = require('../domain/user/index')
class UserService {
	constructor({ UserRepository, UserMapper }) {
		this.userRepository = UserRepository
		this.userMapper = UserMapper
	}
	async getUser(userId){
		const userData = await this.userRepository.getUser(userId)
		if (!userData) return null
		return this.userMapper.toDomain(userData)
	}
	
	async getUsers() {
		const userData = await this.userRepository.getUsers()
		return userData.map(user => this.userMapper.toDomain(user))
	}
	
	async createUser(name, email) {
		const user = new User(null, name, email)
		const userMap = this.userMapper.toData(user)
		const userData = await this.userRepository.createUser(userMap)
		return this.userMapper.toDomain(userData)
	}
	
	async updateUser(userId, name, email) {
		try {
			const updatedUser = new User(userId, name, email)
			const userMap = this.userMapper.toData(updatedUser)
			const userData = await this.userRepository.updateUser(userMap)
			return this.userMapper.toDomain(userData)
		} catch (error) {
			throw new Error('Failed to update user: ' + error.message)
		}
	}
	
	async removeUser(userId) {
		try {
			return this.userRepository.removeUser(userId)
		} catch (error) {
			throw new Error('Failed to delete user: ' + error.message)
		}
	}

}
module.exports = UserService;