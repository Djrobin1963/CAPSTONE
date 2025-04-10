const { Client } = require("pg");
const client = new Client(process.env.DATABASE_URL || 3000);

module.exports = client;
