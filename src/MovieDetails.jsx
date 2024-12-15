import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./App.css";

const MovieDetails = ({ toggleFavorite, favorites }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState("");
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");

  const fixedComments = [
    { user: "Hugo", text: "Ótimo filme, recomendo!" },
    { user: "Helena", text: "Muito emocionante!" },
    { user: "Humberto", text: "Uma obra-prima!" },
    { user: "Heloísa", text: "A atuação foi incrível!" },
    { user: "Henrique", text: "Amei a trilha sonora!" },
  ];

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}`,
          {
            params: { api_key: "a8fbe7b51aecb9fec9312029e25bd651" },
          }
        );

        if (response.data) {
          setMovie(response.data);
        } else {
          console.error("Filme não encontrado");
        }

        const videosResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/videos`,
          {
            params: { api_key: "a8fbe7b51aecb9fec9312029e25bd651" },
          }
        );
        const trailerVideo = videosResponse.data.results.find(
          (video) => video.type === "Trailer"
        );
        if (trailerVideo) {
          setTrailer(trailerVideo.key);
        }
      } catch (error) {
        console.error("Erro ao buscar detalhes do filme:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    if (commentInput.trim()) {
      setComments([...comments, commentInput]);
      setCommentInput("");
    }
  };

  const handleShare = async () => {
    const pageUrl = window.location.href; // Obtém o link da página atual
    try {
      if (navigator.share) {
        await navigator.share({
          title: movie ? movie.title : "Filme",
          text: `Confira esse filme: ${movie ? movie.title : ""}`,
          url: pageUrl,
        });
        console.log("Compartilhado com sucesso");
      } else {
        alert(
          "A funcionalidade de compartilhamento não está disponível no seu navegador"
        );
      }
    } catch (error) {
      console.error("Erro ao compartilhar:", error);
    }
  };

  if (!movie) return <div>Carregando...</div>;

  return (
    <div className="movie-details">
      <div className="movie-container">
        <div className="movie-info">
          <h2 className="movie-title">{movie.title}</h2>

          {trailer && (
            <div className="trailer-container">
              <h3>Trailer</h3>
              <iframe
                title="Trailer"
                width="100%"
                height="315"
                src={`https://www.youtube.com/embed/${trailer}`}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          )}

          <p>
            <strong>Ano:</strong> {movie.release_date.split("-")[0]}
          </p>
          <p>
            <strong>Gênero:</strong>{" "}
            {movie.genres.map((genre) => genre.name).join(", ")}
          </p>
          <p>
            <strong>Avaliação:</strong> {movie.vote_average}
          </p>
          <p>
            <strong>Descrição:</strong> {movie.overview}
          </p>

          <button
            onClick={() => toggleFavorite(movie)}
            className="favorite-button"
          >
            <span role="img" aria-label="Favoritar">
              {favorites.some((fav) => fav.id === movie.id)
                ? "Favoritado ❤️"
                : "Favoritar 🤍"}
            </span>
          </button>

          <button onClick={handleShare} className="share-button">
            Compartilhar
          </button>
        </div>
        <div className="movie-banner">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
            alt={movie.title}
            className="movie-backdrop"
          />
        </div>
      </div>

      <div className="comments-section">
        <h3>Comentários</h3>
        <form onSubmit={handleCommentSubmit}>
          <input
            type="text"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            placeholder="Escreva seu comentário..."
          />
          <button type="submit">Enviar</button>
        </form>
        <ul>
          {fixedComments.map((comment, index) => (
            <li key={index}>
              <strong>{comment.user}:</strong> {comment.text}
            </li>
          ))}
          {comments.map((comment, index) => (
            <li key={index}>
              <strong>Você:</strong> {comment}
            </li>
          ))}
        </ul>
      </div>

      <button className="back-button" onClick={() => navigate(-1)}>
        Voltar
      </button>
    </div>
  );
};

export default MovieDetails;
