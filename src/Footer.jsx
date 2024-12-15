import React from "react";
import "./App.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>© 2024 LenaFlix. Todos os direitos reservados.</p>
      <div className="footer-links">
        <a href="/about" className="footer-link">
          Sobre
        </a>
        <a href="/contact" className="footer-link">
          Contato
        </a>
        <a href="/privacy" className="footer-link">
          Política de Privacidade
        </a>
      </div>
    </footer>
  );
};

export default Footer;
