import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDrag } from "@use-gesture/react";
import "./App.css";

const MovieCarousel = ({ movies, toggleFavorite, favorites }) => {
  const navigate = useNavigate();
  const carouselRef = useRef();

  const bind = useDrag(({ movement: [x], direction: [dx], velocity, down }) => {
    if (velocity > 0.5 && !down) {
      if (dx > 0) {
        carouselRef.current.scrollBy({ left: -300, behavior: "smooth" }); 
      } else {
        carouselRef.current.scrollBy({ left: 300, behavior: "smooth" }); 
      }
    }
  });

  return (
    <div className="movie-carousel" {...bind()} ref={carouselRef}>
      {movies.map((movie) => (
        <div
          key={movie.id}
          className="movie-card"
          onClick={() => navigate(`/movie/${movie.id}`)}
        >
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="movie-image"
          />
          <h3>{movie.title}</h3>
          <p className="movie-description">
            {movie.overview.length > 100
              ? `${movie.overview.substring(0, 100)}...`
              : movie.overview}
          </p>
          <button
            className="favorite-button"
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(movie);
            }}
          >
            {favorites.some((fav) => fav.id === movie.id) ? "❤️" : "♡"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default MovieCarousel;
