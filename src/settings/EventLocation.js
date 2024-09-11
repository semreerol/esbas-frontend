import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./EventLocation.css";

function EventLocation() {
  const navigate = useNavigate();
  const location = useLocation();
  const EventID = location.state?.EventID;

  const [locations, setLocations] = useState([]);
  const [newLocation, setNewLocation] = useState("");

  useEffect(() => {
    // Fetch existing locations from the backend when the component loads
    axios
      .get("https://localhost:7282/Event_LocationDTO")
      .then((response) => setLocations(response.data))
      .catch((error) => console.error("Error fetching locations:", error));
  }, []);

  const addLocation = () => {
    if (newLocation.trim()) {
      // Send POST request to add new location
      axios
        .post("https://localhost:7282/Event_LocationDTO", {
          name: newLocation.trim(),
        })
        .then((response) => {
          setLocations([...locations, response.data]);
          setNewLocation("");
        })
        .catch((error) => console.error("Error adding location:", error));
    }
  };

  const deleteLocation = (l_ID, index) => {
    // Send DELETE request to remove location
    axios
      .delete(`https://localhost:7282/Event_LocationDTO/${l_ID}`)
      .then(() => {
        setLocations(locations.filter((_, i) => i !== index));
      })
      .catch((error) => console.error("Error deleting location:", error));
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleSaveClick = () => {
    console.log(`EventID: ${EventID} için konum kaydedildi`);
    //navigate(`/event-update/${EventID}`);
    navigate(-1);
  };

  return (
    <div className="container">
      <header className="header">
        <img
          src={`${process.env.PUBLIC_URL}/logo-esbas.png`}
          onClick={handleLogoClick}
          className="logo"
          alt="logo"
        />
      </header>

      <h2>ETKİNLİK KONUM</h2>

      <ul className="location-list">
        {locations.map((location, index) => (
          <li key={index} className="location-item">
            {index + 1} {location.name}
            <button
              onClick={() => deleteLocation(location.l_ID, index)}
              className="delete-button"
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>

      <div className="input-container">
        <input
          type="text"
          value={newLocation}
          onChange={(e) => setNewLocation(e.target.value)}
          placeholder="Yeni Konum Yazınız"
          className="input-field"
        />
        <button onClick={addLocation} className="add-button">
          + Yeni Konumu Ekle
        </button>
      </div>

      <button onClick={handleSaveClick} className="save-button">
        KAYDET
      </button>
    </div>
  );
}

export default EventLocation;
