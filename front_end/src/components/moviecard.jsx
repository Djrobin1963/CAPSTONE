import { Link } from "react-router-dom";
import "./moviecard.css";

export default function MovieCard({ movie }) {
  const posterUrl =
    movie.poster_url ||
    (movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "https://via.placeholder.com/200x300?text=No+Image");

  const title = movie.title || "Untitled";
  const releaseYear =
    movie.release_year || (movie.release_date?.slice(0, 4) ?? "N/A");
  const rating = movie.avg_rating ?? movie.vote_average ?? "No ratings yet";

  return (
    <div className="moviecard">
      <Link to={`/movies/${movie.id}`}>
        <img src={posterUrl} alt={title} className="poster" />
        <h3>
          {title} ({releaseYear})
        </h3>
        <p>⭐ {typeof rating === "number" ? rating.toFixed(1) : rating}</p>
      </Link>
    </div>
  );
}
