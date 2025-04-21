const { v4: uuidv4 } = require("uuid");
const client = require("./client");

async function seedComments(users, reviews) {
  const comments = [];

  for (let i = 0; i < reviews.length; i++) {
    const user = users[i % users.length];
    const review = reviews[i];

    const text = `Comment on review for movie ${review.movie_id}`;
    const id = uuidv4();

    await client.query(
      `INSERT INTO comments (id, user_id, review_id, text)
       VALUES ($1, $2, $3, $4)`,
      [id, user.id, review.id, text]
    );

    comments.push({ id, review_id: review.id });
  }

  return comments;
}

module.exports = { seedComments };
