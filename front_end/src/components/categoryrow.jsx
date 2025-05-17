import { useRef, useEffect } from "react";
import MovieCard from "./MovieCard";
import "./categoryrow.css";

export default function CategoryRow({ title, movies }) {
  const scrollRef = useRef(null);
  const animationRef = useRef(null);

  const scroll = () => {
    const container = scrollRef.current;
    if (!container) return;

    container.scrollLeft += 0.5;

    if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
      container.scrollLeft = 0;
    }

    animationRef.current = requestAnimationFrame(scroll);
  };

  const startScroll = () => {
    if (!animationRef.current) {
      animationRef.current = requestAnimationFrame(scroll);
    }
  };

  const stopScroll = () => {
    cancelAnimationFrame(animationRef.current);
    animationRef.current = null;
  };

  useEffect(() => {
    return () => stopScroll();
  }, []);

  return (
    <div className="category-row">
      <h2 className="category-title">{title}</h2>
      <div
        className="scroll-container"
        ref={scrollRef}
        onMouseEnter={startScroll}
        onMouseLeave={stopScroll}
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
