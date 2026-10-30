import "./styles/layout.css";
import SPORTSEE from "./assets/SPORTSEE.png";
import LOGO from "./assets/logo.png";
import LOGOHOVER from "./assets/logoHover.png";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { logout } from "./utils/login";
import { useNavigate } from "react-router-dom";


export default function Layout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <>
      <header>
        <Link to="/dashboard">
          <div className="logo">
            <img src={LOGOHOVER} alt="Logo Sportsee" className="hover" />
            <img src={LOGO} alt="Logo Sportsee" className="no-hover" />
            <img src={SPORTSEE} alt="Logo Sportsee" />
          </div>
        </Link>
        <nav>
          <div>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/profile">Mon profil</Link>
          </div>
          <button className="logout" onClick={handleLogout}>
            Se déconnecter
          </button>
        </nav>
      </header>
      <Outlet />
      <footer>
        <div className="container">
          <p>ⓒSportsee Tous droits réservés</p>
          <div className="links">
            <a href="#">Conditions générales</a>
            <a href="#">Contact</a>
            <div className="logo">
              <img src={LOGOHOVER} alt="Logo Sportsee" className="hover" />
              <img src={LOGO} alt="Logo Sportsee" className="no-hover" />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
