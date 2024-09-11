import React, { useState } from "react";
import "./ParticipantGender.css";
import { useNavigate } from "react-router-dom";

function ParticipantGender() {
  const [genders, setGenders] = useState(["Kadın", "Erkek"]);
  const [newGender, setNewGender] = useState("");

  const navigate = useNavigate();
  const addGender = () => {
    if (newGender.trim()) {
      setGenders([...genders, newGender.trim()]);
      setNewGender("");
    }
  };

  const deleteGender = (index) => {
    setGenders(genders.filter((_, i) => i !== index));
  };
  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div className="container">
      <header className="header">
        <img
          src=/*"./logo-esbas.png"*/ {`${process.env.PUBLIC_URL}/logo-esbas.png`}
          onClick={handleLogoClick}
          className="logo"
          alt="logo"
        />
      </header>{" "}
      <h2> KATILIMCI CİNSİYET </h2>{" "}
      <ul className="gender-list">
        {" "}
        {genders.map((gender, index) => (
          <li key={index} className="gender-item">
            {" "}
            {index + 1} {gender}{" "}
            <button
              onClick={() => deleteGender(index)}
              className="delete-button"
            >
              🗑️
            </button>{" "}
          </li>
        ))}{" "}
      </ul>{" "}
      <div className="input-container">
        <input
          type="text"
          value={newGender}
          onChange={(e) => setNewGender(e.target.value)}
          placeholder="Yeni Cinsiyeti Yazınız"
          className="input-field"
        />
        <button onClick={addGender} className="add-button">
          +
        </button>{" "}
      </div>{" "}
      <button className="save-button"> KAYDET </button>{" "}
    </div>
  );
}

export default ParticipantGender;