import { useState, useEffect } from "react";
import axios from "axios";
import style from "../css/module/AppMyMail.module.css";
import { Link } from "react-router-dom";
export default function AppMyMail() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get("http://localhost:3000/contact");
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className={style.containerGeneralMail}>
      <div className={style.HeaderDashboard}>
        <div className={style.containerAdd}>
          <Link to="/dashboard">
            <p className="font-league text-2xl text-white">Indietro</p>
          </Link>
        </div>
        <div className={style.containerTitleDashboard}>
          <p className="font-sanchez text-sm text-white">ADMIN</p>
          <p className="font-league text-5xl tracking-widest text-white">
            DASHBOARD
          </p>
        </div>
      </div>
      <div className={style.containerMailist}>
        <div className={style.MailList}>
          {messages.map((message) => (
            <div key={message.id} className={style.MailItem}>
              <p className="font-league text-3xl tracking-widest text-white">
                Hai Ricevuto un Email da: {message.email}
              </p>
              <p className="font-sanchez text-2xl text-white mt-4">
                Message: {message.message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
