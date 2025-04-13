import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { apiFetch } from "../api/client";
import "./comments.css";

export default function CommentBox({
  reviewId,
  initialComments,
  onCommentUpdate,
}) {
  const { user } = useContext(AuthContext);
  const [comments, setComments] = useState(initialComments || []);
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      const comment = await apiFetch("/comments", {
        method: "POST",
        body: JSON.stringify({ review_id: reviewId, text }),
      });
      const updated = [...comments, comment];
      setComments(updated);
      setText("");
      onCommentUpdate && onCommentUpdate(reviewId, updated);
    } catch {
      setError("Failed to post comment.");
    }
  }

  async function handleEdit(id, updatedText) {
    try {
      const updated = await apiFetch(`/comments/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ text: updatedText }),
      });
      const updatedList = comments.map((c) => (c.id === id ? updated : c));
      setComments(updatedList);
      setEditingId(null);
    } catch {
      setError("Failed to edit comment.");
    }
  }

  async function handleDelete(id) {
    try {
      await apiFetch(`/comments/${id}`, { method: "DELETE" });
      const updatedList = comments.filter((c) => c.id !== id);
      setComments(updatedList);
    } catch {
      setError("Failed to delete comment.");
    }
  }

  return (
    <div className="comment-box">
      <h4>Comments</h4>
      {error && <p className="error">{error}</p>}

      {comments.map((comment) => (
        <div key={comment.id} className="comment">
          <strong>{comment.username}:</strong>
          {editingId === comment.id ? (
            <>
              <textarea
                defaultValue={comment.text}
                onBlur={(e) => handleEdit(comment.id, e.target.value)}
              />
              <small>(editing...)</small>
            </>
          ) : (
            <p>{comment.text}</p>
          )}

          {user && user.id === comment.user_id && (
            <div className="comment-actions">
              <button onClick={() => setEditingId(comment.id)}>Edit</button>
              <button onClick={() => handleDelete(comment.id)}>Delete</button>
            </div>
          )}
        </div>
      ))}

      {user && (
        <form onSubmit={handleSubmit} className="comment-form">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows="2"
            placeholder="Write a comment..."
            required
          />
          <button type="submit">Post Comment</button>
        </form>
      )}
    </div>
  );
}
