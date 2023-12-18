import React, { useState, useEffect } from "react";
import style from "../css/module/AppLogin.module.css";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AppLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // Aggiungi uno stato locale per l'errore
  const [localError, setLocalError] = useState(null);

  const { login, isLogged, error } = useAuth();
  console.log("Auth context:", useAuth());
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogged) {
      navigate("/dashboard");
    }
  }, [isLogged, navigate]);

  // Effettua il login e gestisci l'errore
  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setLocalError(null);

    try {
      const response = await login(email, password);
      console.log("Login success:", response);
    } catch (error) {
      console.error("Dettagli dell'errore:", error);

      // Usa l'errore dal contesto o uno stato locale
      const errorMessage = error.response?.data?.error || error.message;
      setLocalError(errorMessage || "Si è verificato un errore.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style.containerLogin}>
      <div className={style.cotnainerForm}>
        <div className={style.formStyle}>
          <form onSubmit={handleLogin}>
            {(error || localError) && (
              <div className={style.errorContainer}>
                <p className={style.erroItem}>{error || localError}</p>
              </div>
            )}
            <div className="flex flex-col items-center justify-center mb-8">
              <label className={style.labelForm} htmlFor="email">
                Email
              </label>
              <input
                className={style.inputForm}
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-center justify-center">
              <label className={style.labelForm} htmlFor="password">
                Password
              </label>
              <input
                className={style.inputForm}
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                className={style.ButtonSubmit}
                type="submit"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
