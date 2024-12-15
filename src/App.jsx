import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link,
} from "react-router-dom";
import axios from "axios";
import MovieCarousel from "./MovieCarousel";
import MovieDetails from "./MovieDetails";
import Filter from "./Filter";
import SearchBar from "./SearchBar";
import Menu from "./Menu";
import Favorites from "./Favorites";
import Footer from "./Footer";
import Login from "./Login";
import Signup from "./Signup";
import "./App.css";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/movie/popular",
          {
            params: { api_key: "a8fbe7b51aecb9fec9312029e25bd651" },
          }
        );
        setMovies(response.data.results);
        setFilteredMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);

    const storedAuth =
      JSON.parse(localStorage.getItem("isAuthenticated")) || false;
    setIsAuthenticated(storedAuth);
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  const handleFilter = (type) => {
    let sortedMovies = [...filteredMovies];

    if (type === "alphabetical") {
      sortedMovies.sort((a, b) => a.title.localeCompare(b.title));
    } else if (type === "rating") {
      sortedMovies.sort((a, b) => b.vote_average - a.vote_average);
    }

    setFilteredMovies(sortedMovies);
  };

  const toggleFavorite = (movie) => {
    const updatedFavorites = favorites.some((fav) => fav.id === movie.id)
      ? favorites.filter((fav) => fav.id !== movie.id)
      : [...favorites, movie];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", JSON.stringify(true));
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem("isAuthenticated", JSON.stringify(false));
  };

  return (
    <Router>
      <div className="App">
        {!isAuthenticated ? (
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login onLogin={login} />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        ) : (
          <>
            <header>
              <h1 className="app-title">Lenaflix</h1>
              <Menu onLogout={logout} isAuthenticated={isAuthenticated} />
              <div className="header-controls">
                <SearchBar onSearch={handleSearch} />
                <Filter onFilter={handleFilter} />

                <Link to="/favorites">
                  <button className="favorites-button">Favoritos</button>
                </Link>
              </div>
            </header>
            <Routes>
              <Route
                path="/"
                element={
                  <MovieCarousel
                    movies={filteredMovies}
                    toggleFavorite={toggleFavorite}
                    favorites={favorites}
                  />
                }
              />
              <Route
                path="/movie/:id"
                element={
                  <MovieDetails
                    toggleFavorite={toggleFavorite}
                    favorites={favorites}
                  />
                }
              />
              <Route
                path="/favorites"
                element={<Favorites favorites={favorites} />}
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            <Footer />
          </>
        )}
      </div>
    </Router>
  );
};

export default App;
