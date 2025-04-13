import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { apiFetch } from "../api/client";
import "./MovieDetails.css";

export default function MovieDetails() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [rating, setRating] = useState("");
  const [text, setText] = useState("");
  const [formError, setFormError] = useState("");
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

  const userReview = user
    ? movie?.reviews.find((r) => r.user_id === user.id)
    : null;
  const otherReviews = movie?.reviews.filter(
    (r) => !user || r.user_id !== user.id
  );

  async function handleReviewSubmit(e) {
    e.preventDefault();

    if (rating < 1 || rating > 10) {
      setFormError("Rating must be between 1 and 10.");
      return;
    }

    try {
      await apiFetch("/reviews", {
        method: "POST",
        body: JSON.stringify({
          movie_id: movie.id,
          rating,
          text,
        }),
      });

      const updatedMovie = await apiFetch(`/movies/${movie.id}`);
      setMovie(updatedMovie);
      setRating("");
      setText("");
      setFormError("");
    } catch (err) {
      setFormError("Failed to submit review.");
    }
  }

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
            <strong>Average Rating:</strong>{" "}
            {movie.avg_rating ?? "No ratings yet"}
          </p>
          <p>{movie.description}</p>
        </div>
      </div>

      {user && userReview && (
        <div className="your-review">
          <h3>Your Review</h3>
          <p>
            <strong>You rated it {userReview.rating}/10</strong>
          </p>
          <p>{userReview.text}</p>
          {/* Future: Add edit/delete buttons here */}
        </div>
      )}

      {user && !userReview && (
        <div className="inline-review-form">
          <h3>Write a Review</h3>
          {formError && <p className="error">{formError}</p>}
          <form onSubmit={handleReviewSubmit}>
            <label>Rating (1–10):</label>
            <input
              type="number"
              value={rating}
              min="1"
              max="10"
              onChange={(e) => setRating(e.target.value)}
              required
            />

            <label>Your Review:</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows="4"
              required
            />

            <button type="submit">Submit Review</button>
          </form>
        </div>
      )}

      <h3>Other Reviews</h3>
      <div className="reviews">
        {otherReviews?.length ? (
          otherReviews.map((review) => (
            <div key={review.id} className="review-card">
              <p>
                <strong>{review.username}</strong> rated it {review.rating}/10
              </p>
              <p>{review.text}</p>
            </div>
          ))
        ) : (
          <p>No other reviews yet.</p>
        )}
      </div>
    </div>
  );
}
