const { faker } = require("@faker-js/faker");
const { v4: uuidv4 } = require("uuid");
const client = require("./client");

async function seedComments(users, reviews, count = 1000) {
  for (let i = 0; i < count; i++) {
    const id = uuidv4();
    const user = faker.helpers.arrayElement(users);
    const review = faker.helpers.arrayElement(reviews);
    const text = faker.lorem.sentences({ min: 1, max: 2 });

    await client.query(
      `
      INSERT INTO comments (id, user_id, review_id, text)
      VALUES ($1, $2, $3, $4)
    `,
      [id, user.id, review.id, text]
    );
  }
}

module.exports = { seedComments };
