const client = require("./client");

const createTables = async () => {
  await client.query(
    /*SQL*/
    `DROP TABLE IF EXISTS comments, reviews, movies, users CASCADE;`
  );

  await client.query(
    /*SQL*/
    `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`
  );

  await client.query(
    /*SQL*/
    `
    CREATE TABLE users (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW ()
    );

    CREATE TABLE movies (
      id INTEGER PRIMARY KEY,              
      title TEXT NOT NULL,
      description TEXT,
      poster_url TEXT,
      release_year INT,
      vote_average NUMERIC,  
      popularity NUMERIC,
      original_language TEXT              
    );

    CREATE TABLE reviews (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      user_id UUID REFERENCES users(id) ON DELETE CASCADE,
      movie_id INTEGER REFERENCES movies(id) ON DELETE CASCADE,
      rating INTEGER CHECK (rating BETWEEN 1 AND 10),
      text TEXT,
      created_at TIMESTAMP DEFAULT NOW(),
      UNIQUE(user_id, movie_id)
    );

    CREATE TABLE comments (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      user_id UUID REFERENCES users(id) ON DELETE CASCADE,
      review_id UUID REFERENCES reviews(id) ON DELETE CASCADE,
      text TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );
    `
  );
};

module.exports = {
  createTables,
};
