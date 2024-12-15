import React from "react";
import { Link } from "react-router-dom";

const Favorites = ({ favorites }) => {
  return (
    <div className="favorites-container">
      <div className="favorites-card">
        <h2>Meus Filmes Favoritos</h2>
        {favorites.length === 0 ? (
          <p>Nenhum filme favorito ainda.</p>
        ) : (
          <ul>
            {favorites.map((movie) => (
              <li key={movie.id}>{movie.title}</li>
            ))}
          </ul>
        )}
        <Link to="/">
          <button className="back-button">Voltar</button>
        </Link>
      </div>
    </div>
  );
};

export default Favorites;
