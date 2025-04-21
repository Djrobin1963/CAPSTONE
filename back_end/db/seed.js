require("dotenv").config();
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
      id UUID PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE movies (
      id INTEGER PRIMARY KEY,              -- TMDB movie ID (external source)
      title TEXT NOT NULL,
      description TEXT,
      poster_url TEXT,
      release_year INT,
      vote_average NUMERIC,               -- TMDB average rating (0–10)
      popularity NUMERIC,
      original_language TEXT
    );

    CREATE TABLE reviews (
      id UUID PRIMARY KEY,
      user_id UUID REFERENCES users(id) ON DELETE CASCADE,
      movie_id INTEGER REFERENCES movies(id) ON DELETE CASCADE,
      rating INTEGER CHECK (rating BETWEEN 1 AND 10),
      text TEXT,
      created_at TIMESTAMP DEFAULT NOW(),

      UNIQUE (user_id, movie_id)  -- One review per user per movie
    );

    CREATE TABLE comments (
      id UUID PRIMARY KEY,
      user_id UUID REFERENCES users(id) ON DELETE CASCADE,
      review_id UUID REFERENCES reviews(id) ON DELETE CASCADE,
      text TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );

    -- Uncomment these if needed:
    -- CREATE TABLE genres (
    --   id INTEGER PRIMARY KEY,         -- TMDB genre ID
    --   name TEXT UNIQUE NOT NULL
    -- );

    -- CREATE TABLE movie_genres (
    --   movie_id INTEGER REFERENCES movies(id) ON DELETE CASCADE,
    --   genre_id INTEGER REFERENCES genres(id) ON DELETE CASCADE,
    --   PRIMARY KEY (movie_id, genre_id)
    -- );
    `
  );
};

module.exports = { createTables };
