const { faker } = require("@faker-js/faker");
const { v4: uuidv4 } = require("uuid");
const client = require("./client");

async function seedMovies(count = 100) {
  const movies = [];

  for (let i = 0; i < count; i++) {
    const id = uuidv4();
    const title = faker.lorem.words({ min: 1, max: 4 });
    const description = faker.lorem.paragraph();
    const poster_url = faker.image.urlPicsumPhotos({ width: 200, height: 300 });
    const release_year = faker.date
      .between({ from: "1980-01-01", to: "2024-01-01" })
      .getFullYear();

    await client.query(
      `
      INSERT INTO movies (id, title, description, poster_url, release_year)
      VALUES ($1, $2, $3, $4, $5)
    `,
      [id, title, description, poster_url, release_year]
    );

    movies.push({ id, title });
  }

  return movies;
}

module.exports = { seedMovies };
