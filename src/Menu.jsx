import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Menu = ({ onLogout, isAuthenticated }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    onLogout();
    navigate("/login");
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
                  <Link to="/profile">Perfil</Link>
                </li>
                <li>
                  <Link to="/favorites">Favoritos</Link>
                </li>

                <li>
                  <button onClick={handleLogout}>Deslogar</button>
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
