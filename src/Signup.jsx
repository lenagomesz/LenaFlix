import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Hook de navegação

  const handleSignup = (e) => {
    e.preventDefault();

    // Armazenando os dados do usuário no localStorage
    const user = { username, password };
    localStorage.setItem("user", JSON.stringify(user));

    alert("Usuário cadastrado com sucesso!");

    // Redireciona para a tela de login
    navigate("/login");
  };

  return (
    <div className="signup">
      <h2>Cadastro</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default Signup;
