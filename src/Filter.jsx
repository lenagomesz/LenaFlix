import React, { useState } from "react";
import "./App.css";

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
        <div className="filter-overlay">
          <div className="filter-window">
            <h3>Escolha um Filtro</h3>
            <button onClick={() => handleSortChange("alphabetical")}>
              Ordenar Alfabéticamente
            </button>
            <button onClick={() => handleSortChange("rating")}>
              Filtrar por Número de Avaliações
            </button>
            <button className="close-button" onClick={() => setIsOpen(false)}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
