const { faker } = require("@faker-js/faker");
const { v4: uuidv4 } = require("uuid");
const client = require("./client");

async function seedReviews(users, movies, count = 500) {
  const used = new Set();
  const reviews = [];

  for (let i = 0; i < count; i++) {
    const user = faker.helpers.arrayElement(users);
    const movie = faker.helpers.arrayElement(movies);
    const key = `${user.id}-${movie.id}`;

    if (used.has(key)) continue;
    used.add(key);

    const id = uuidv4();
    const rating = faker.number.int({ min: 1, max: 10 });
    const text = faker.lorem.sentences({ min: 1, max: 3 });

    await client.query(
      /*SQL*/
      `
      INSERT INTO reviews (id, user_id, movie_id, rating, text)
      VALUES ($1, $2, $3, $4, $5)
    `,
      [id, user.id, movie.id, rating, text]
    );

    reviews.push({ id, user_id: user.id });
  }

  return reviews;
}

module.exports = { seedReviews };
