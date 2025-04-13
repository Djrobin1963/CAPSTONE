import { Link } from "react-router-dom";
import { AuthContext } from "../context/authcontext";
import { useContext } from "react";
import "./Header.css";

export default function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="header">
      <div className="header-container">
        {/* LEFT: Logo only */}
        <Link to="/" className="logo">
          🎬 Movie Reviews
        </Link>

        {/* RIGHT: Welcome + Nav */}
        <div className="header-right">
          {user && (
            <span className="welcome-msg">Welcome, {user.username}</span>
          )}

          <nav className="nav-links">
            <Link to="/">Home</Link>
            {user ? (
              <>
                <Link to="/account">My Account</Link>
                <button onClick={logout} className="logout-btn">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
