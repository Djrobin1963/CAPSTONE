import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiFetch } from "../api/client";
import MovieCard from "./moviecard";

export default function CategoryPage() {
  const { category } = useParams();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchCategory() {
      try {
        const data = await apiFetch(`/tmdb/${category}`);
        console.log("Category data:", data);
        setMovies(data);
      } catch (err) {
        console.error("Failed to load category:", err.message);
      }
    }

    fetchCategory();
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
