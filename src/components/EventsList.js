import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import axios from "axios";
import "./EventList.css";

const EventList = () => {
  const { eventID } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [events, setEvents] = useState([]);
  const [locations, setLocations] = useState([]);
  const [types, setTypes] = useState([]);

  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      const eventResponse = await axios.get(`https://localhost:7282/EventsDTO`);
      const typeResponse = await axios.get('https://localhost:7282/Event_TypeDTO')
      const locationResponse = await axios.get('https://localhost:7282/Event_LocationDTO');

      setEvents(eventResponse.data);
      setLocations(locationResponse.data);
      setTypes(typeResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleParticipantClick = (EventID) => {
    console.log(EventID);

    navigate(`/plist/${EventID}`);
    //navigate('/plist');
  };


  const handleStartClick = (EventID) => {
    navigate(`/card-reader/${EventID}`);
  };

  const handleYeniEtkinlik = () => {
    navigate("/add-new-event");
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredEvents = events.filter((event) =>
    event.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpdateClick = (EventID) => {
    navigate(`/event-update/${EventID}`);
  };

  const handleDeleteClick = (EventID) => {
    axios.delete(`https://localhost:7282/EventsDTO/SoftDelete_Status${EventID}`)
      .then(eventResponse => {
        console.log("Event deleted (status set to false):", eventResponse.data);
        window.location.reload();
      })
      .catch(error => {
        console.error('Error deleting event:', error);
      });
  };

  return (
    <div className="container">
      <header className="header">
        <div className="logo-container">
          <img src="./logo-esbas.png" alt="ESBAŞ Logo" className="logo" />
        </div>
        <div className="search-container">
          <input
            type="text"
            placeholder="ARA"
            className="search-bar"
            value={searchTerm}
            onChange={handleSearchChange}
            name="searchTerm"
            id="searchTerm"
          />
          <button onClick={handleYeniEtkinlik} className="new-event-button">
            +YENİ ETKİNLİK
          </button>
        </div>
      </header>
      <div className="App">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>ETKİNLİK ADI</th>
              <th>ETKİNLİK TİPİ</th>
              <th>KONUM</th>
              <th>ZAMAN</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.map((event) => {

              const eventType = types.find((types) => types.t_ID === event.event_Type.t_ID);
              //console.log("t_ID",event.event_Type.t_ID);
              const eventLocation = locations.find((locations) => locations.l_ID === event.event_Location.l_ID);
              //console.log("l_ID",event.event_Location.l_ID);
              return (
                <tr key={event.eventID}>
                  <td>{event.eventID}</td>
                  <td>{event.name}</td>
                  <td>{eventType ? eventType.name : 'Unknown'}</td>
                  <td>{eventLocation ? eventLocation.name : 'Unknown'}</td>
                  <td>{event.eventDateTime}</td>
                  <td>
                    <button
                      className="katilimci-butonu"
                      onClick={() => handleParticipantClick(event.eventID)}
                    >
                      Katılımcı Listesi
                    </button>
                    <button
                      className="baslat-butonu"
                      onClick={() => handleStartClick(event.eventID)}
                    >
                      Başlat
                    </button>
                  </td>
                  <td>
                    <button className="update-button" onClick={() => handleUpdateClick(event.eventID)}>
                      <FaEdit />
                    </button>
                    <button className="delete-button" onClick={() => handleDeleteClick(event.eventID)}>
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventList;
