import React from 'react';
import { Link } from 'react-router-dom';

const HamburgerMenu = () => {
  return (
    <div className="hamburger-menu">
      <input type="checkbox" id="menu-toggle" />
      <label htmlFor="menu-toggle" className="menu-icon">
        <span></span>
      </label>
      <div className="menu">
        <Link to="/add-movie">Cadastrar Filme</Link>
      </div>
    </div>
  );
};

export default HamburgerMenu;
