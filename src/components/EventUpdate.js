import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./EventUpdate.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

const UpdateEvent = () => {
  const { EventID } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState({
    name: "",
    t_ID: "", // Type ID
    l_ID: "", // Location ID
    event_Type:{},
    event_Location:{},
    eventDateTime: "",
  });

  const [eventTypes, setEventTypes] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const [eventResponse, typeResponse, locationResponse] = await Promise.all([
          axios.get(`https://localhost:7282/EventsDTO/${EventID}`),
          axios.get('https://localhost:7282/Event_TypeDTO'),
          axios.get('https://localhost:7282/Event_LocationDTO')
        ]);

        if (event.name === "") {
          setEvent(eventResponse.data);
        }
        setEventTypes(typeResponse.data);
        setLocations(locationResponse.data);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchEventDetails();
  }, [EventID]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("name,value", name, value)
    setEvent({
      ...event,
      [name]: value
    });
    console.log("event bu:", event)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`https://localhost:7282/EventsDTO/${EventID}`, event);
      console.log("Event updated:", event);
      navigate("/");
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const handleIconClick = (path) => {
    navigate(path);
  };


  const handleLoGoClick = () => {
    navigate("/");
  };

  return (
    <div className="update-container">
      <header className="header">
        <img
          src={`${process.env.PUBLIC_URL}/logo-esbas.png`}
          onClick={handleLoGoClick}
          className="logo"
          alt="logo"
        />
      </header>
      <h2>Update Event</h2>
      {event ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Event Name</label>
            <input
              type="text"
              name="name"
              value={event.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Type
              <FontAwesomeIcon
                icon={faCog}
                onClick={() => handleIconClick('/add-new-event/event-type')}
                className="icon"
              />
            </label>
            <select
              name="t_ID"
              value={event.event_Type.t_ID}
              onChange={handleChange}
              required
            >
              <option value="">Select Type</option>
              {eventTypes.map((type) => (
                <option key={type.t_ID} value={type.t_ID}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Location
              <FontAwesomeIcon
                icon={faCog}
                onClick={() => handleIconClick('/add-new-event/event-location')}
                className="icon"
              />
            </label>
            <select
              name="l_ID"
              value={event.event_Location.l_ID}
              onChange={handleChange}
              required
            >
              <option value="">Select Location</option>
              {locations.map((location) => (
                <option key={location.l_ID} value={location.l_ID}>
                  {location.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Date and Time</label>
            <input
              type="datetime-local"
              name="eventDateTime"
              value={event.eventDateTime}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="save-button">Update Event</button>
        </form>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default UpdateEvent;

