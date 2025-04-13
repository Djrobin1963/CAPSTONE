import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiFetch } from "../api/client";
import "./MovieDetails.css";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMovie() {
      try {
        const data = await apiFetch(`/movies/${id}`);
        setMovie(data);
      } catch (err) {
        setError("Movie not found.");
      }
    }

    fetchMovie();
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!movie) return <p>Loading...</p>;

  return (
    <div className="movie-details">
      <div className="movie-header">
        <img src={movie.poster_url} alt={movie.title} />
        <div>
          <h2>
            {movie.title} ({movie.release_year})
          </h2>
          <p>
            <strong>Average Rating:</strong> {movie.avg_rating ?? "N/A"}
          </p>
          <p>{movie.description}</p>
        </div>
      </div>

      <h3>Reviews</h3>
      <div className="reviews">
        {movie.reviews?.length ? (
          movie.reviews.map((review) => (
            <div key={review.id} className="review-card">
              <p>
                <strong>{review.username}</strong> rated it {review.rating}/10
              </p>
              <p>{review.text}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
}
