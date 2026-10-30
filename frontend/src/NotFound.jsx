import { Link } from "react-router-dom";
import "./styles/NotFound.css";

function NotFound() {
  return (
    <main className="not-found">
      <h1>404</h1>
      <p>Oups ! La page que vous recherchez n'existe pas.</p>
      <Link to="/">Retourner à la page d'accueil</Link>
    </main>
  );
}

export default NotFound;

