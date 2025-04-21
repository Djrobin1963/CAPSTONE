const client = require("./client");
require("dotenv").config();

const TMDB_KEY = process.env.TMDB_API_KEY;
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

async function fetchPopularMovies(page = 1) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_KEY}&language=en-US&page=${page}`
  );
  const data = await res.json();
  return data.results;
}

async function seedMovies(pages = 1) {
  const movies = [];

  for (let p = 1; p <= pages; p++) {
    const results = await fetchPopularMovies(p);

    for (const movie of results) {
      if (
        !movie.id ||
        !movie.title ||
        !movie.release_date ||
        !movie.poster_path
      )
        continue;

      const poster_url = `${IMAGE_BASE}${movie.poster_path}`;
      const release_year = new Date(movie.release_date).getFullYear();

      await client.query(
        /*SQL*/
        `INSERT INTO movies (id, title, description, poster_url, release_year, vote_average, popularity, original_language)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         ON CONFLICT DO NOTHING`,
        [
          movie.id,
          movie.title,
          movie.overview || "No description.",
          poster_url,
          release_year,
          movie.vote_average,
          movie.popularity,
          movie.original_language || "en",
        ]
      );

      movies.push({ id: movie.id, title: movie.title });
    }
  }

  return movies;
}

module.exports = { seedMovies };
