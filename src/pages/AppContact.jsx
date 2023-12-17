import React, { useState } from "react";
import style from "../css/module/AppContact.module.css";
import axios from "axios";

export default function AppContact() {
  const [formData, setFormData] = useState({
    email: "",
    message: "",
  });

  const [submitMessage, setSubmitMessage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/contact", formData);
      // Handle success
      setSubmitMessage(
        "Messaggio Inviato con Successo, verrai ricontattato da un nostro operatore"
      );
      // Clear the form
      setFormData({ email: "", message: "" });
    } catch (error) {
      // Handle error
      setSubmitMessage("Error sending message. Please try again later.");
    }
  };

  return (
    <div className={style.containerLogin}>
      <div className={style.cotnainerForm}>
        <div className={style.formStyle}>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-center justify-center mb-8">
              <label className={style.labelForm} htmlFor="email">
                Email
              </label>
              <input
                className={style.inputForm}
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex flex-col items-center justify-center">
              <label className={style.labelForm} htmlFor="message">
                Your Message
              </label>
              <textarea
                className={style.inputForm}
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            <div className="flex items-center justify-center">
              <button className={style.ButtonSubmit} type="submit">
                Send Message
              </button>
            </div>
          </form>
          {submitMessage && (
            <p className={style.submitMessage}>{submitMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
}
