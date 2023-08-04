const {Database} = require('../index');
const Repository = require('../../../domain/user/repository');

class UserRepository extends Repository {
	constructor({dbConfig}) {
		super();
		this.db = new Database(dbConfig);
	}
	
	async getUser(userId) {
		try {
			const query = 'SELECT * FROM users WHERE user_id = ?';
			const values = [userId];
			const result = await this.db.query(query, values);
			if (result.length > 0) {
				return result[0];
			} else {
				throw new Error('User not found');
			}
		} catch (error) {
			throw new Error('Failed to fetch user: ' + error.message);
		}
	}
	
	async getUsers() {
		try {
			const query = 'SELECT * FROM users';
			const result = await this.db.query(query);
			
			return result;
		} catch (error) {
			throw new Error('Failed to fetch users: ' + error.message);
		}
	}
	
	async createUser(domainUser) {
		try {
			const insertQuery = 'INSERT INTO users (name, email) VALUES (?, ?)'
			const selectQuery = 'SELECT * FROM users WHERE user_id = LAST_INSERT_ID()'
			const values = [domainUser.name, domainUser.email]

			const result = await this.db.query(insertQuery, values)
			const userId = result.insertId

			const [user] = await this.db.query(selectQuery, [userId])
			if (!user) {
				throw new Error('Failed to fetch user after creation')
			}
			return user
		} catch (error) {
			throw new Error('Failed to create user: ' + error.message)
		}
	}
	
	async updateUser(userData) {
		try {
			const query = 'UPDATE users SET name = ?, email = ? WHERE user_id = ?'
			const values = [userData.name, userData.email, userData.user_id]
			await this.db.query(query, values)

			const selectQuery = 'SELECT * FROM users WHERE user_id = ?'
			const [updatedUserData] = await this.db.query(selectQuery, [userData.user_id])
			
			if (!updatedUserData) {
				throw new Error('Failed to fetch user after update')
			}
			
			return updatedUserData
		} catch (error) {
			throw new Error('Failed to update user: ' + error.message)
		}
	}
	
	async removeUser(userId) {
		try {
			const query = 'DELETE FROM users WHERE user_id = ?'
			const result = await this.db.query(query, [userId])
			return result.affectedRows > 0
		} catch (error) {
			throw new Error('Failed to delete user: ' + error.message)
		}
	}
	
}

module.exports = UserRepository;
