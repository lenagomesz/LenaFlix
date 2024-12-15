import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    const user = { username, password };
    localStorage.setItem("user", JSON.stringify(user));

    alert("Usuário cadastrado com sucesso!");
    navigate("/login");
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">Cadastro</h2>
        <form onSubmit={handleSignup} className="signup-form">
          <input
            type="text"
            className="signup-input"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            className="signup-input"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="signup-button">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
