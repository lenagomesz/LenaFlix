/* eslint-disable no-unused-vars */
import React, { useState } from "react";

const Filter = ({ onFilter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sortType, setSortType] = useState("");

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSortChange = (type) => {
    setSortType(type);
    onFilter(type);
    setIsOpen(false);
  };

  return (
    <div className="filter">
      <button className="filter-button" onClick={toggleDropdown}>
        Filtrar
      </button>
      {isOpen && (
        <div className="filter-options">
          <button onClick={() => handleSortChange("alphabetical")}>
            Ordenar Alfabéticamente
          </button>
          <button onClick={() => handleSortChange("rating")}>
            Filtrar por Número de Avaliações
          </button>
        </div>
      )}
    </div>
  );
};

export default Filter;
