import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddNewEvent.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

const AddNewEvent = () => {
  const [eventName, setEventName] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDateTime, setEventDateTime] = useState("");
  const [eventTypes, setEventTypes] = useState([]);
  const [locations, setLocations] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventTypesAndLocations = async () => {
      try {
        const eventTypeResponse = await axios.get('https://localhost:7282/Event_TypeDTO');
        const locationResponse = await axios.get('https://localhost:7282/Event_LocationDTO');

        setEventTypes(eventTypeResponse.data); // Dinamik veriyi state'e kaydet
        setLocations(locationResponse.data); // Dinamik veriyi state'e kaydet
      } catch (error) {
        console.error("Error fetching event types or locations", error);
      }
    };

    fetchEventTypesAndLocations();
  }, []);

  const handleSave = async () => {
    const newEvent = {
      Name: eventName,
      t_ID: eventType, // Burada Type ID gönderilecek
      l_ID: eventLocation, // Burada Location ID gönderilecek
      EventDateTime: eventDateTime,
      Status: true,
      Event_Status: true,
    };

    console.log(newEvent);

    await axios.post('https://localhost:7282/EventsDTO', newEvent)
      .then(response => {
        console.log('Event added successfully:', response.data);

        setEventName("");
        setEventType("");
        setEventLocation("");
        setEventDateTime("");

        navigate("/");
      })
      .catch(error => {
        console.error('There was an error adding the event!', error);
      });
  };

  const handleIconClick = (path) => {
    navigate(path);
  };

  const handleLoGoClick = () => {
    navigate("/");
  };

  return (
    <div className="add-new-event-container">
      <header className="header">
        <img src="./logo-esbas.png" onClick={handleLoGoClick} className="logo" alt="logo" />
      </header>
      <div className="add-new-event">
        <h1>Yeni Etkinlik Oluşturma</h1>

        <div className="form-group">
          <label>Etkinlik Adı</label>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            placeholder="Yazınız"
          />
        </div>

        <div className="form-group">
          <label>Etkinlik Türü
            <FontAwesomeIcon
              icon={faCog}
              onClick={() => handleIconClick('/add-new-event/event-type')}
              className="icon"
            />
          </label>
          <select
            value={eventType} // Seçilen ID burada saklanacak
            onChange={(e) => setEventType(e.target.value)}
          >
            <option value="">Seçiniz</option>
            {eventTypes.map((type) => (
              <option key={type.t_ID} value={type.t_ID}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Konum
            <FontAwesomeIcon
              icon={faCog}
              onClick={() => handleIconClick('/add-new-event/event-location')}
              className="icon"
            />
          </label>
          <select
            value={eventLocation} // Seçilen ID burada saklanacak
            onChange={(e) => setEventLocation(e.target.value)}
          >
            <option value="">Seçiniz</option>
            {locations.map((location) => (
              <option key={location.l_ID} value={location.l_ID}>
                {location.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Tarih ve Saat</label>
          <input
            type="datetime-local"
            name="eventDateTime"
            value={eventDateTime}
            onChange={(e) => setEventDateTime(e.target.value)}
            required
          />
        </div>
        <div className="button-container">
          <button onClick={handleSave}>Kaydet</button>
        </div>
      </div>
    </div>
  );
};

export default AddNewEvent;

