import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <input
      type="text"
      className="search-bar"
      placeholder="Pesquise filmes..."
      value={searchTerm}
      onChange={handleChange}
    />
  );
};

export default SearchBar;
