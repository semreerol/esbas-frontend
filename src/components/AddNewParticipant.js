import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AddNewParticipant.css";
import axios from "axios";

const AddNewParticipant = () => {
  const navigate = useNavigate(); // useNavigate kancasını kullanarak navigate fonksiyonunu tanımlıyoruz
  const { eventID } = useParams(); // useParams kancasını kullanarak URL'den eventID parametresini alıyoruz
  const [form, setForm] = useState({
    FullName: "",
    CardID: "",
    Deparment: "",
    IsOfficeEmployee: "",
    Gender: "",
  });

  // Form alanlarının değişimini yöneten fonksiyon
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  // Form gönderildiğinde çalışacak fonksiyon
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Yeni kullanıcı ekle
      const userResponse = await axios.post('https://localhost:7282/UsersDTO', form);

      // Yeni kullanıcıyı etkinlikle ilişkilendir
      const CardID = userResponse.data.id; // Yeni kullanıcının ID'sini al
      await axios.post('https://localhost:7282/Events_UsersDTO', { eventID: parseInt(eventID), CardID });

      navigate(`/plist/${eventID}`);
      console.log("Katılımcı başarıyla eklendi");
    } catch (error) {
      console.error('Katılımcı eklenirken hata oluştu:', error);
    }
  };

  // Logoya tıklanınca ana sayfaya yönlendiren fonksiyon
  const handleLoGoClick = () => {
    navigate("/");
  };

  // Misafir katılımcı ekle sayfasına yönlendiren fonksiyon
  const handleAddGuestClick = () => {
    navigate("/add-guest");
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
          <h2>Yeni Katılımcı Ekle</h2>
          <button className="misafir-butonu" onClick={handleAddGuestClick}>Misafir Katılımcı</button>
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
              name="CardID"
              value={form["CardID"]}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Kaydet</button>
        </form>
      </div>
    </div>
  );
};

export default AddNewParticipant;



/*
<label>
            Departman:
            <FontAwesomeIcon
            icon = {faCog}
            onClick={() => handleIconClick('/add-new-participant/participant-department')}
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
            icon = {faCog}
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
            icon = {faCog}
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
            </select>{" "}
          </label>{" "}
*/