import "./styles/login.css";
import SPORTSEE from "./assets/SPORTSEE.png";
import LOGO from "./assets/logo.png";
import LOGOHOVER from "./assets/logoHover.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "./utils/login";
import { useUser } from "./hook/useUser";

export default function LoginPage() {
  const navigate = useNavigate();
  const { refreshUserData } = useUser();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      await login(username, password);
      await refreshUserData();
      navigate("/dashboard");
    } catch (error) {
      setError("Erreur dans le mot de passe ou l'identifiant");
      console.error(error);
    }
  }

  return (
    <main className="login-main">
      <section className="login-form">
        <Link to="/">
          <div className="logo">
              <img src={LOGOHOVER} alt="Logo Sportsee" className="hover" />
              <img src={LOGO} alt="Logo Sportsee" className="no-hover" />
              <img src={SPORTSEE} alt="Logo Sportsee" />
            </div>
        </Link>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <h1>
              Transformez <br></br> vos stats en résultats
            </h1>

            <div className="connection-form">
              <h2>Se Connecter</h2>
              <div>
                <label htmlFor="username">Adresse email</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password">Mot de passe</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                />
              </div>
            </div>
            <button
              type="submit"
              className="connection-btn"
              id="connection-button"
            >
              Se connecter
            </button>
            {error && <p className="login-error">{error}</p>}
            <p>Mot de passe oublié ?</p>
          </form>
        </div>
      </section>
      <section className="vertical-banner">
        <div>
          <p>
            Analysez vos performances en un clin d’œil, suivez vos progrès et
            atteignez vos objectifs.
          </p>
        </div>
      </section>
    </main>
  );
}
