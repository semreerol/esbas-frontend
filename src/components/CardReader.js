import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
import "./CardReader.css";

const sendUserEvent = async (eventUser) => {
  try {
    await axios.post('https://localhost:7282/Events_UsersDTO', eventUser);
  } catch (error) {
    throw new Error('Error sending user event');
  }
};

const fetchUserByCardId = async (cardId) => {
  try {
    // cardId'yi URL'ye ekleyerek fetch işlemi gerçekleştir
    const response = await axios.get(`https://localhost:7282/UsersDTO/${cardId}`);
    return response.data[0]; // Tek bir kullanıcı döndürülür
  } catch (error) {
    throw new Error('Error fetching user by card ID');
  }
};

function CardReader() {
  const navigate = useNavigate();
  const { EventID } = useParams();
  const [cardInput, setCardInput] = useState("");
  const [user, setUser] = useState(null); // Kullanıcı state'ini ekle  
  
  const handleEndEvent = () => {
    navigate(`/event-ended/${EventID}`);
  };

  const handleManualEntry = () => {
    navigate(`/add-new-participant/${EventID}`);
  };

  const handleChange = (event) => {
    setCardInput(event.target.value);
  };

  const handleSubmit = async (event) => {

    event.preventDefault(); // Formun varsayılan davranışını engelle

    // Kart ID'sindeki baştaki sıfırları kaldır
    const formattedCardId = cardInput.replace(/^0+/, '')

    try {
        console.log("Formatted Card Input:", formattedCardId);
      const user = await fetchUserByCardId(formattedCardId);
      if (!user) {
        await sendUserEvent({ EventID: EventID, CardID: formattedCardId});
        console.log("EventID,cardID",EventID,formattedCardId);
        console.log("Kullanıcı başarıyla etkinliğe eklendi.");
        message.success("Etkinliğe Katılımınız Başarıyla Gerçekleşti");
      } else {
        console.error("Kullanıcı bulunamadı.");
        message.error("Etkinliğe Kaydınız Oluşturulamadı!");
      }
      setCardInput(""); // Reset the input field
    } catch (error) {
      console.error("Kullanıcı eklenirken bir hata oluştu:", error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  const handleLoGoClick = () => {
    navigate("/");
  };

  return (
    <div className="CardReader">
      <header className="header">
        <img src={`${process.env.PUBLIC_URL}/logo-esbas.png`} onClick={handleLoGoClick} className="logo" alt="logo" />
      </header>
      <div className="card-reader">
        <h1>ETKİNLİĞE HOŞGELDİNİZ</h1>
        <p>LÜTFEN KARTINIZI OKUTUNUZ!</p>
        <p>Etkinlik ID: {EventID}</p>
        <input
          autoFocus
          type="text"
          className="card-input"
          value={cardInput}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <div className="buttons">
          <button
            type="primary"
            onClick={handleManualEntry}
            className="buttons-details manual-entry"
          >
            MANUEL GİRİŞ
          </button>
          <button type="danger" onClick={handleEndEvent} className="buttons-details end-event">
            ETKİNLİĞİ BİTİR
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardReader;

//  import React, { useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
//  import { message } from "antd";
// import "./CardReader.css";

// const sendUserEvent = async (eventUser) => {
//    try {
//       await axios.post('https://localhost:7282/Events_UsersDTO', eventUser);
//      } catch (error) {
//        throw new Error('Error sending user event');
//      }
//   };
  
//   const fetchUserByCardId = async (cardId) => {
//      try {

//       const response = await axios.get(`https://localhost:7282/UsersDTO/${cardId}`);
//      return response.data[0]; // Tek bir kullanıcı döndürülür
//    } catch (error) {
//        throw new Error('Error fetching user by card ID');
//     }
//   };

// function CardReader() {  
//   const navigate = useNavigate();  
//   const { EventID } = useParams();  
//   const [cardInput, setCardInput] = useState("");  
//   const [user, setUser] = useState(null); // Kullanıcı state'ini ekle  

//   const handleEndEvent = () => {  
//     navigate(`/event-ended/${EventID}`);  
//   };  

//   const handleManualEntry = () => {  
//     navigate(`/add-new-participant/${EventID}`);  
//   };  

//   const handleChange = (event) => {  
//     setCardInput(event.target.value);  
//   };  

//   const handleSubmit = async (event) => {  
//     event.preventDefault();  

//     const formattedCardId = cardInput.replace(/^0+/, '');  

//     try {  
//       const fetchedUser = await fetchUserByCardId(formattedCardId);  
//       if (!fetchedUser) {  
//         await sendUserEvent({ EventID: EventID, CardID: formattedCardId });  
//         console.log("EventID,cardID", EventID, formattedCardId);  
//         console.log("Kullanıcı başarıyla etkinliğe eklendi.");  
//         message.success("Etkinliğe Katılımınız Başarıyla Gerçekleşti");  
//         setUser(fetchedUser); // Kullanıcıyı state'e kaydet  
//       } else {  
//         console.error("Kullanıcı bulunamadı.");  
//         message.error("Etkinliğe Kaydınız Oluşturulamadı!");  
//       }  
//       setCardInput("");  
//     } catch (error) {  
//       console.error("Kullanıcı eklenirken bir hata oluştu:", error);  
//     }  
//   };  

//   // ...  

//   return (  
//     <div className="CardReader">  
//       {/* ... */}  
//       {user && (  
//         <div>  
//           <h2>Kullanıcı Bilgileri</h2>  
//           <p>Ad: {user.Name}</p>  
//           <p>Soyad: {user.Surname}</p>  
//           <p>Kart ID: {user.CardID}</p>  
//           {/* Diğer kullanıcı bilgilerini de buraya ekleyebilirsiniz */}  
//         </div>  
//       )}  
//     </div>  
//   );  
// }

