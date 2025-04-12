import { useEffect, useState } from "react";
import { apiFetch } from "../api/client";
import MovieCard from "../components/moviecard";

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function loadMovies() {
      try {
        const data = await apiFetch("/movies");
        console.log("Loaded movies:", data);
        setMovies(data);
      } catch (err) {
        console.error("Error loading movies:", err.message);
      }
    }

    loadMovies();
  }, []);

  return (
    <div className="home">
      <h1>🎬 All Movies </h1>
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
