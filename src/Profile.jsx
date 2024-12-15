/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    photo: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPhoto, setNewPhoto] = useState(null);

  useEffect(() => {
    const storedUserInfo = JSON.parse(localStorage.getItem("userInfo")) || {
      name: " Usuário",
      photo: "",
    };
    setUserInfo(storedUserInfo);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewName(value);
  };

  const handleSave = () => {
    const updatedUserInfo = {
      name: newName || userInfo.name,
      photo: newPhoto || userInfo.photo,
    };
    setUserInfo(updatedUserInfo);
    localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
    setIsEditing(false);
  };

  const handleEdit = () => {
    setNewName(userInfo.name);
    setNewPhoto(userInfo.photo);
    setIsEditing(true);
  };

  const pickImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-container">
      <h2>Perfil do Usuário</h2>
      <div className="profile-info">
        <div>
          <label htmlFor="name">Nome:</label>
          {isEditing ? (
            <input
              type="text"
              id="name"
              name="name"
              value={newName}
              onChange={handleChange}
            />
          ) : (
            <span>{userInfo.name}</span>
          )}
        </div>

        <div>
          <label htmlFor="photo">Foto de Perfil:</label>
          {isEditing ? (
            <>
              <input type="file" accept="image/*" onChange={pickImage} />
              {newPhoto && (
                <img src={newPhoto} alt="Pré-visualização" width="100" />
              )}
            </>
          ) : (
            userInfo.photo && (
              <img src={userInfo.photo} alt="Foto de Perfil" width="100" />
            )
          )}
        </div>

        <div>
          {isEditing ? (
            <button onClick={handleSave}>Salvar</button>
          ) : (
            <button onClick={handleEdit}>Editar</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
