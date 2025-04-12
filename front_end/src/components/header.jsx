import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          🎬 Movie Reviews
        </Link>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </nav>
      </div>
    </header>
  );
}
