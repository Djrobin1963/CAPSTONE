import { Link } from "react-router-dom";
import { AuthContext } from "../context/authcontext";
import { useContext } from "react";
import "./header.css";

export default function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo on the left */}
        <Link to="/" className="logo">
          🎬 Movie Reviews
        </Link>

        {/* Right side: welcome + nav */}
        <nav className="nav">
          {user && (
            <span className="nav-item welcome-msg">
              Welcome, {user.username}
            </span>
          )}

          <Link to="/" className="nav-item">
            Home
          </Link>

          {/* TMDB Movies Dropdown */}
          <div className="dropdown">
            <Link className="nav-item dropbtn">Movies </Link>
            <div className="dropdown-content">
              <Link to="/category/popular">🔥 Popular</Link>
              <Link to="/category/top_rated">🌟 Top Rated</Link>
              <Link to="/category/now_playing">🎥 Now Playing</Link>
              <Link to="/category/upcoming">🚀 Upcoming</Link>
            </div>
          </div>

          {user ? (
            <>
              <Link to="/account" className="nav-item">
                Account
              </Link>
              <button onClick={logout} className="nav-item logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-item">
                Login
              </Link>
              <Link to="/register" className="nav-item">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
