import React from 'react';
import { useNavigate } from 'react-router-dom';

const MovieCarousel = ({ movies, toggleFavorite, favorites }) => {
  const navigate = useNavigate();

  return (
    <div className="movie-carousel">
      {movies.map(movie => (
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
            {movie.overview.length > 100 ? `${movie.overview.substring(0, 100)}...` : movie.overview}
          </p> 
          <button 
            className="favorite-button" 
            onClick={(e) => {
              e.stopPropagation(); 
              toggleFavorite(movie);
            }}
          >
            {favorites.some(fav => fav.id === movie.id) ? '❤️' : '♡'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default MovieCarousel;
