import { useEffect, useState } from "react";
import CategoryRow from "../components/categoryrow";
import { apiFetch } from "../api/client";
import "../pages/home.css";
import HeroBanner from "../components/herobanner";

export default function Home() {
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [heroMovie, setHeroMovie] = useState(null);

  const fetchCategory = async (endpoint, setter) => {
    try {
      const data = await apiFetch(`/tmdb/${endpoint}`);
      setter(data);
      console.log(`Fetched ${endpoint}`, data);
    } catch (err) {
      console.error(`Failed to fetch ${endpoint}:`, err.message);
    }
  };

  useEffect(() => {
    async function loadRandomUpcomingMovie() {
      try {
        const upcoming = await apiFetch("/tmdb/upcoming");
        if (upcoming && upcoming.length > 0) {
          const randomIndex = Math.floor(Math.random() * upcoming.length);
          setHeroMovie(upcoming[randomIndex]);
        }
      } catch (err) {
        console.error("Failed to load random upcoming movie:", err.message);
      }
    }

    loadRandomUpcomingMovie();
  }, []);

  useEffect(() => {
    fetchCategory("popular", setPopular);
    fetchCategory("top_rated", setTopRated);
    fetchCategory("upcoming", setUpcoming);
    fetchCategory("now_playing", setNowPlaying);
  }, []);

  return (
    <div className="home">
      <HeroBanner movie={heroMovie} />

      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
        🎬 Discover Movies
      </h1>
      <CategoryRow title="Popular" movies={popular} />
      <CategoryRow title="Top Rated" movies={topRated} />
      <CategoryRow title="Upcoming" movies={upcoming} />
      <CategoryRow title="Now Playing" movies={nowPlaying} />
    </div>
  );
}
