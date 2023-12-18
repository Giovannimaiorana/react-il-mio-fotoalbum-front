import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(false);
  const [authData, setAuthData] = useState({
    user: null,
    isLogged: false,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedAuthData = JSON.parse(localStorage.getItem("authData"));
    if (storedAuthData) {
      setAuthData(storedAuthData);
    }
  }, []);

  useEffect(() => {
    setIsLogged(authData.isLogged);
  }, [authData]);

  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });

      const { token, userData } = response.data;

      localStorage.setItem(
        "authData",
        JSON.stringify({ user: userData, token, isLogged: true })
      );
      localStorage.setItem("token", token);
      setAuthData({ user: userData, isLogged: true });
      setError(null);

      console.log("Login effettuato");

      return true;
    } catch (error) {
      console.error("Errore durante il login:", error);

      if (error.response && error.response.status === 401) {
        setError("Password non corretta. Riprova.");
      } else {
        setError("Credenziali non valide. Riprova.");
      }

      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("authData");
    setAuthData({ user: null, isLogged: false });
    setError(null);
  };

  return (
    <AuthContext.Provider value={{ isLogged, authData, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
