import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AddNewParticipant.css";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import 'ag-grid-enterprise';

const AddNewParticipant = () => {
  const navigate = useNavigate();
  const { eventID } = useParams();
  const [form, setForm] = useState({
    FullName: "",
    UserID: "",
    Deparment: "",
    IsOfficeEmployee: "",
    Gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userResponse = await axios.post(
        "https://localhost:7282/UsersDTO",
        form
      );

      // Yeni kullanıcıyı etkinlikle ilişkilendir
      const UserID = userResponse.data.id; // Yeni kullanıcının ID'sini al
      await axios.post("https://localhost:7282/Events_UsersDTO", {
        eventID: parseInt(eventID),
        UserID,
      });

      navigate(`/plist/${eventID}`);
    } catch (error) {
      console.error("Error adding participant:", error);
    }
  };

  const handleLoGoClick = () => {
    navigate("/");
  };

  const handleIconClick = (path) => {
    navigate(path);
  };
  const handleClickGoDepartment = (path) => {
    navigate("/add-new-participant/department");
  };

  return (
    <div className="add-participant-container">
      <header className="header">
        <img
          src={`${process.env.PUBLIC_URL}/logo-esbas.png`}
          onClick={handleLoGoClick}
          className="logo"
          alt="ESBAŞ Logo"
        />
      </header>
      <div className="add-participant">
        <div className="add-participant-header">
          <h2>Misafir Katılımcı Ekle</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <label>
            Ad Soyad:
            <input
              type="text"
              name="FullName"
              value={form["FullName"]}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Card ID:
            <input
              type="text"
              name="UserID"
              value={form["UserID"]}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Departman:
            <FontAwesomeIcon
              icon={faCog}
              onClick={handleClickGoDepartment}
              className="icon"
            />
            <select
              name="Department"
              value={form.Department}
              onChange={handleChange}
              required
            >
              <option value=""> Seçiniz </option>{" "}
              <option value="İnsan Kaynakları"> İnsan Kaynakları </option>{" "}
              <option value="Bilgi İşlem"> Bilgi İşlem </option>{" "}
            </select>{" "}
          </label>{" "}
          <label>
            Çalışma Alanı:
            <FontAwesomeIcon
              icon={faCog}
              onClick={() => handleIconClick('/add-new-participant/participant-location')}
              className="icon"
            />
            <select
              name="IsOfficeEmployee"
              value={form.IsOfficeEmployee}
              onChange={handleChange}
              required
            >
              <option value=""> Seçiniz </option>
              <option value="Ofis"> Ofis </option>
              <option value="Saha"> Saha </option>
            </select>{" "}
          </label>{" "}
          <label>
            Cinsiyet:
            <FontAwesomeIcon
              icon={faCog}
              onClick={() => handleIconClick('/add-new-participant/participant-gender')}
              className="icon"
            />
            <select
              name="Gender"
              value={form.Gender}
              onChange={handleChange}
              required
            >
              <option value=""> Seçiniz </option>
              <option value="Kadın"> Kadın </option>
              <option value="Erkek"> Erkek </option>
            </select>
          </label>
          <button type="submit">Kaydet</button>
        </form>
      </div>
    </div>
  );
};

export default AddNewParticipant;
