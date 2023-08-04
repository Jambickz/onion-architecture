class User {
	constructor(userId = null, name, email) {
		this.userId = userId;
		this.name = name;
		this.email = email;
	}
}

module.exports = User;
