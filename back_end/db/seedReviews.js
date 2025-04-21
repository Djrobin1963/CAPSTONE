const { v4: uuidv4 } = require("uuid");
const client = require("./client");

async function seedReviews(users, movies) {
  const reviews = [];

  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const movie = movies[i % movies.length]; // spread out evenly
    const rating = Math.floor(Math.random() * 10) + 1;
    const text = `This is a review for "${movie.title}"`;

    const id = uuidv4();

    await client.query(
      `INSERT INTO reviews (id, user_id, movie_id, rating, text)
       VALUES ($1, $2, $3, $4, $5)`,
      [id, user.id, movie.id, rating, text]
    );

    reviews.push({ id, user_id: user.id, movie_id: movie.id });
  }

  return reviews;
}

module.exports = { seedReviews };
