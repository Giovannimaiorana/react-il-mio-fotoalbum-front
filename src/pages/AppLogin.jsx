import React, { useState, useEffect } from "react";
import style from "../css/module/AppLogin.module.css";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AppLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { login, isLogged } = useAuth();
  console.log("Auth context:", useAuth());
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogged) {
      navigate("/dashboard");
    }
  }, [isLogged, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const loginSuccess = await login(email, password);
      console.log("Login success:", loginSuccess);
      if (loginSuccess) {
      }
    } catch (error) {
      throw new Error(error);
      console.log("Dettagli dell'errore:", Error);

      if (error.response && error.response.status === 404) {
        setError("Credenziali non valide. Riprova.");
      } else {
        setError(
          "Si è verificato un errore durante il login. Riprova più tardi."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style.containerLogin}>
      <div className={style.cotnainerForm}>
        <div className={style.formStyle}>
          <form onSubmit={handleLogin}>
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
            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
