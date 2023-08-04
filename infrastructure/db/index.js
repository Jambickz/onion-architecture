const mysql = require('mysql2/promise');

class Database {
	constructor(dbConfig) {
		this.pool = mysql.createPool(dbConfig);
	}
	
	async query(sql, values) {
		const [rows] = await this.pool.query(sql, values);
		return rows;
	}
	async createTables(tableSchema) {
		const createTableQuery = `CREATE TABLE IF NOT EXISTS ${tableSchema.tableName} (
			${tableSchema.columns.join(', ')}
		)`;
		await this.query(createTableQuery);
		console.log(`Table ${tableSchema.tableName} created or already exists.`);
	}
	
	
	async close() {
		await this.pool.end();
	}
}

const dbConfig = {
	host: 'localhost',
	user: 'admin',
	password: '1231231234',
	database: 'learn_database',
};

const tableSchema = {
	tableName: 'users',
	columns: [
		'user_id INT AUTO_INCREMENT PRIMARY KEY',
		'name VARCHAR(255) NOT NULL',
		'email VARCHAR(255) NOT NULL',
	],
};

const initializeDatabase = async () => {
	try {
		const db = new Database(dbConfig)
		await db.createTables(tableSchema)
		await db.close()
	} catch (error) {
		console.error(error)
	}
}



module.exports = {Database, initializeDatabase};
