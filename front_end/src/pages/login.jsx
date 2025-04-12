import { useState } from "react";
import { apiFetch } from "../api/client";
import { useNavigate } from "react-router-dom";
import "./Authform.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { token, user } = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/account");
    } catch (err) {
      setError("Invalid email or password");
    }
  }

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {error && <p className="auth-error">{error}</p>}
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}
