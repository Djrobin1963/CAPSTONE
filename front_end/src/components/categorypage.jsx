import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiFetch } from "../utils/apiFetch";
import Moviecard from ".moviecard";

export default function CategoryPage() {
  const { category } = useParams();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await apiFetch(`tmdb/${category}`);
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [category]);

  return (
    <div className="category-page">
      <h1 style={{ textAlign: "center" }}>
        {category.replace("_", " ").toUpperCase()}
      </h1>
      <div className="category-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
