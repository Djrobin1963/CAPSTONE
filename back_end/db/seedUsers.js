const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const client = require("./client");

async function seedUsers(count = 50) {
  const users = [];

  for (let i = 0; i < count; i++) {
    const id = uuidv4();
    const username = faker.internet.username();
    const email = faker.internet.email();
    const password = await bcrypt.hash("password123", 10);

    await client.query(
      /*SQL*/
      `
      INSERT INTO users (id, username, email, password)
      VALUES ($1, $2, $3, $4)
    `,
      [id, username, email, password]
    );

    users.push({ id, username });
  }

  return users;
}

module.exports = { seedUsers };
