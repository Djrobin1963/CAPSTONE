import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { apiFetch } from "../api/client";
import "./account.css";

export default function MyAccount() {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadReviews() {
      try {
        const data = await apiFetch("/users/me/reviews");
        setReviews(data);
      } catch (err) {
        setError("Failed to load your reviews.");
      }
    }

    loadReviews();
  }, []);

  if (!user) return <p>You must be logged in to view your account.</p>;

  return (
    <div className="account-page">
      <h2>My Account</h2>

      <div className="account-info">
        <p>
          <strong>Username:</strong> {user.username}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
      </div>

      <h3>My Reviews</h3>
      <div className="my-reviews">
        {reviews.length ? (
          reviews.map((review) => (
            <div key={review.id} className="review-card">
              <p>
                <strong>Movie:</strong> {review.movie_title}
              </p>
              <p>
                <strong>Rating:</strong> {review.rating}/10
              </p>
              <p>{review.text}</p>
            </div>
          ))
        ) : (
          <p>You haven’t written any reviews yet.</p>
        )}
      </div>
    </div>
  );
}
