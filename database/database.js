const mysql = require("mysql2");
const util = require('util');
const dotenv = require('dotenv');

// Load the env file into process.env
dotenv.config(); 

const db = mysql.createPool({
	host: process.env.mysql_HOST,
	user: process.env.mysql_USER,
	password: process.env.mysql_PASSWORD,
	database: process.env.mysql_DATABASE
});

// making a async query 
const query = util.promisify(db.query).bind(db);


module.exports = { db, query };