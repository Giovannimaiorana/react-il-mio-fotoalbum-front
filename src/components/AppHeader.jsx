import style from "../css/module/AppHeader.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function AppHeader() {
  const { isLogged, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };
  return (
    <div className="w-full bg-black">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <h1 className="font-league text-7xl tracking-widest text-white">
            PHOTO TIME
          </h1>
        </div>
        <div>
          <ul className="font-league flex">
            <Link to="/">
              <li className="ml-5 text-3xl tracking-widest text-white">Home</li>
            </Link>
            <Link to="/album">
              <li className="ml-5 text-3xl tracking-widest text-white">
                Album
              </li>
            </Link>
            <Link to="/contact">
              <li className="ml-5 text-3xl tracking-widest text-white">
                Contact
              </li>
            </Link>

            {isLogged ? (
              <p
                className="ml-5 text-3xl tracking-widest text-white"
                onClick={handleLogout}
              >
                Logout
              </p>
            ) : (
              <Link to="/login">
                <p className="ml-5 text-3xl tracking-widest text-white">
                  Login
                </p>
              </Link>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
