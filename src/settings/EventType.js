import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // useLocation'u ekledik
import axios from "axios";
import "./EventType.css";

function EventType() {
  const navigate = useNavigate();
  const location = useLocation(); // useType yerine useLocation kullanıyoruz
  const EventID = location.state?.EventID; // EventID'yi state'ten alıyoruz

  const [eventTypes, setEventTypes] = useState([]);
  const [newEventType, setNewEventType] = useState("");

  useEffect(() => {
    // Fetch existing event types from the backend when the component loads
    axios
      .get("https://localhost:7282/Event_TypeDTO")
      .then((response) => setEventTypes(response.data))
      .catch((error) => console.error("Error fetching event types:", error));
  }, []);

  const addEventType = () => {
    if (newEventType.trim()) {
      axios
        .post("https://localhost:7282/Event_TypeDTO", {
          name: newEventType.trim(),
        })
        .then((response) => {
          setEventTypes([...eventTypes, response.data]);
          setNewEventType("");
        })
        .catch((error) => console.error("Error adding event type:", error));
    }
  };

  const deleteEventType = (t_ID, index) => {
    axios
      .delete(`https://localhost:7282/Event_TypeDTO/${t_ID}`)
      .then(() => {
        setEventTypes(eventTypes.filter((_, i) => i !== index));
      })
      .catch((error) => console.error("Error deleting event type:", error));
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleSaveClick = () => {
    console.log(`EventID: ${EventID} için etkinlik türü kaydedildi`);
   // navigate(`/event-update/${EventID}`);
  navigate(-1);
  };

  return (
    <div className="container">
      <header className="header">
        <img
          src={`${process.env.PUBLIC_URL}/logo-esbas.png`}
          className="logo"
          onClick={handleLogoClick}
          alt="logo"
        />
      </header>

      <h2>ETKİNLİK TÜRÜ</h2>
      <ul className="event-list">
        {eventTypes.map((type, index) => (
          <li key={type.t_ID} className="event-item">
            <span>{index + 1}</span>
            <span className="event-name">{type.name}</span>
            <button
              onClick={() => deleteEventType(type.t_ID, index)}
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
          value={newEventType}
          onChange={(e) => setNewEventType(e.target.value)}
          placeholder="Yeni Etkinliği Yazınız"
          className="input-field"
        />
        <button onClick={addEventType} className="add-button">
          + Etkinliği Ekle
        </button>
      </div>
      <button onClick={handleSaveClick} className="save-button">KAYDET</button>
    </div>
  );
}

export default EventType;
