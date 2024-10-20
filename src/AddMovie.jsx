import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddMovie = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [posterPath, setPosterPath] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMovie = {
      id: Date.now(),
      title,
      poster_path: posterPath,
      release_date: releaseDate,
    };
    onAdd(newMovie);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Título do filme"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Caminho do poster"
        value={posterPath}
        onChange={(e) => setPosterPath(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Data de lançamento"
        value={releaseDate}
        onChange={(e) => setReleaseDate(e.target.value)}
        required
      />
      <button type="submit">Adicionar Filme</button>
    </form>
  );
};

export default AddMovie;
