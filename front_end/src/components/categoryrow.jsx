import MovieCard from "./moviecard";
import "./categoryrow.css"; // optional styles for scrolling layout

export default function CategoryRow({ title, movies }) {
  if (!movies || movies.length === 0) {
    return null; // skip rendering empty rows
  }

  return (
    <div className="category-row">
      <h2 className="category-title">{title}</h2>
      <div className="scroll-container">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
