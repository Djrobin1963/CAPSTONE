import { Link } from "react-router-dom";
import { AuthContext } from "../context/authcontext";
import { useContext } from "react";
import "./Header.css";

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
          {user ? (
            <>
              <Link to="/account" className="nav-item">
                My Account
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
