import { Link } from "react-router-dom";
import "./moviecard.css";

export default function movieCard({ movie }) {
  return (
    <div className="moviecard">
      <Link to={`/movies/${movie.id}`}>
        <img src={movie.poster_url} alt={movie.title} className="poster" />
        <h3>
          {movie.title} ({movie.release_year})
        </h3>
        <p>{movie.avg_rating ?? "No ratings yet"}</p>
      </Link>
    </div>
  );
}
