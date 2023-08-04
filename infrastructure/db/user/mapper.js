const User = require("../../../domain/user");

class UserMapper {
	toDomain(data) {
		const { user_id, name, email } = data
		return new User(user_id, name, email)
	}
	
	toData(domainModel) {
		return {
			user_id: domainModel.userId,
			name: domainModel.name,
			email: domainModel.email,
		}
	}
}

module.exports = UserMapper;
