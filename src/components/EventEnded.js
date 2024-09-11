// EventEnded.js
import React from "react";
import "./EventEnded.css";
import { useNavigate, useParams } from "react-router-dom";

function EventEnded() {
  const navigate = useNavigate();
  const { EventID } = useParams();//get EventID from URL parameters

  const handlePersonelList = () => {
    //navigate(`/participant-list/${EventID}`);
    navigate(`/plist/${EventID}`);
  };

  const handleLoGoClick = () => {
    navigate("/");
  }

  return (
    <div className="EventEnded">
      <header className="header">
        <img src={`${process.env.PUBLIC_URL}/logo-esbas.png`} onClick={handleLoGoClick} className="logo" alt="logo" />
      </header>{" "}
      <div className="event-ended">
        <h1> ETKİNLİK SONA ERDİ. </h1>{" "}
        <h1> ÇALIŞAN DÖKÜMÜNÜ GÖRMEK İÇİN TIKLAYINIZ </h1>{" "}
        <div className="buttons">
          <button onClick={handlePersonelList} className="personellist">
            {" "}
            ÇALIŞAN DÖKÜMÜ{" "}
          </button>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}

export default EventEnded;
