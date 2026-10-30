import "./styles/profile.css";
import HeaderProfil from "./components/HeaderProfil/HeaderProfil";

import ProfileInfo from "./components/ProfileInfo/ProfileInfo";
import StatCard from "./components/StatCard/StatCard";
import {useUser} from "./hook/useUser";

export default function ProfilePage() {
  const { userData, loading } = useUser();

  if (loading) {
    return <p>Chargement...</p>;
  }

  const date = new Date(userData.profile.createdAt).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <main id="center2">
        <div className="container">
          <HeaderProfil />
          <ProfileInfo />
        </div>
        <div className="stat">
          <div className="title">
            <h2>Vos Statistique</h2>
            <p>depuis le {date}</p>
          </div>
          <div className="stat-card-container">
            <StatCard type={"time"} />
            <StatCard type={"calories"} />
            <StatCard type={"distance"} />
            <StatCard type={"session"} />
          </div>
        </div>
      </main>
    </>
  );
}
