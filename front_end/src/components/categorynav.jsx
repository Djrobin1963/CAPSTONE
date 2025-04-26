import { NavLink } from "react-router-dom";
import "./categorynav.css";

export default function CategoryNav() {
  const categories = [
    { key: "popular", label: "🔥 Popular" },
    { key: "top_rated", label: "🌟 Top Rated" },
    { key: "now_playing", label: "🎥 Now Playing" },
    { key: "upcoming", label: "🚀 Upcoming" },
  ];

  return (
    <div className="category-nav">
      {categories.map(({ key, label }) => (
        <NavLink
          key={key}
          to={`/category/${key}`}
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          {label}
        </NavLink>
      ))}
    </div>
  );
}
