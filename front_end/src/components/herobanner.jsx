import "./heroBanner.css";

export default function HeroBanner({ movie }) {
  if (!movie) return null;

  const backgroundImage = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

  return (
    <div
      className="hero-banner"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="overlay">
        <h1 className="hero-title">{movie.title}</h1>
        <p className="hero-description">{movie.overview?.slice(0, 200)}...</p>
      </div>
    </div>
  );
}
