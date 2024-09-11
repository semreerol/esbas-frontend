import React, { useState } from "react";
import "./ParticipantLocation.css";
import { useNavigate } from "react-router-dom";

function ParticipantLocation() {
  const [locations, setLocations] = useState(["Ofis", "Saha"]);
  const [newLocation, setNewLocation] = useState("");

  const navigate = useNavigate();
  const addLocation = () => {
    if (newLocation.trim()) {
      setLocations([...locations, newLocation.trim()]);
      setNewLocation("");
    }
  };

  const deleteLocation = (index) => {
    setLocations(locations.filter((_, i) => i !== index));
  };

  const handleLogoClick = () => {
    navigate("/");
  };
  return (
    <div className="container">
      <header className="header">
        <img
          src={`${process.env.PUBLIC_URL}/logo-esbas.png`}
          className="logo"
          onClick={handleLogoClick}
          alt="ESBAŞ Logo"
        />
      </header>{" "}
      <h2> KATILIMCI KONUM </h2>{" "}
      <ul className="location-list">
        {" "}
        {locations.map((location, index) => (
          <li key={index} className="location-item">
            {" "}
            {index + 1} {location}{" "}
            <button
              onClick={() => deleteLocation(index)}
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
          value={newLocation}
          onChange={(e) => setNewLocation(e.target.value)}
          placeholder="Yeni Konumu Yazınız"
          className="input-field"
        />
        <button onClick={addLocation} className="add-button">
          +
        </button>{" "}
      </div>{" "}
      <button className="save-button"> KAYDET </button>{" "}
    </div>
  );
}

export default ParticipantLocation;