import style from "../css/module/AppHeader.module.css";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function AppHeader() {
  const { isLogged, logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  const isNavLinkActive = (path) => {
    return location.pathname === path ? style.active : "";
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
            <Link to="/" className={isNavLinkActive("/")}>
              <li className="ml-5 text-3xl tracking-widest text-white">Home</li>
            </Link>
            <Link to="/album" className={isNavLinkActive("/album")}>
              <li className="ml-5 text-3xl tracking-widest text-white">
                Album
              </li>
            </Link>
            <Link to="/contact" className={isNavLinkActive("/contact")}>
              <li className="ml-5 text-3xl tracking-widest text-white">
                Contact
              </li>
            </Link>

            {isLogged ? (
              <>
                <Link to="/dashboard" className={isNavLinkActive("/dashboard")}>
                  <li className="ml-5 text-3xl tracking-widest text-white">
                    Dashboard
                  </li>
                </Link>
                <p
                  className={`ml-5 text-3xl tracking-widest text-white ${isNavLinkActive(
                    "/logout"
                  )}`}
                  onClick={handleLogout}
                >
                  Logout
                </p>
              </>
            ) : (
              <Link to="/login" className={isNavLinkActive("/login")}>
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
