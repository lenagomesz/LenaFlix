import React, { useState } from "react";
import { Link } from "react-router-dom";

const Menu = ({ onLogout, isAuthenticated }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={`menu-container ${isMenuOpen ? "open" : ""}`}>
      <button className="menu-icon" onClick={toggleMenu}>
        ☰
      </button>
      {isMenuOpen && (
        <div className="menu-links">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {isAuthenticated ? (
              <>
                <li>
                  <button onClick={onLogout}>Deslogar</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/signup">Cadastrar-se</Link>
                </li>
                <li>
                  <Link to="/login">Entrar</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Menu;
