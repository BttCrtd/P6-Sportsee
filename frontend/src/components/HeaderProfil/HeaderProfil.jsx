import "../../styles/headerProfil.css";
import LogoOutline from "../../assets/OUTLINE.png";
import { useUser } from "../../hook/useUser";

export default function HeaderProfil({ dist = false }) {
  const { userData, loading } = useUser();

  if (loading || !userData) {
    return <p>Chargement...</p>;
  }

  const date = new Date(userData.profile.createdAt).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section className="header-profil">
      <div className="info-profil">
        <div className="img-container">
          <img
            src={userData.profile.profilePicture}
            alt={`Photo de profil de ${userData.profile.firstName} ${userData.profile.lastName}`}
          />
        </div>
        <div className="text-info">
          <h2>
            {userData.profile.firstName} {userData.profile.lastName}
          </h2>
          <p>Membre depuis le {date}</p>
        </div>
      </div>
      {dist ? (
        <div className="distance-info">
          <p>Distance totale parcourue</p>
          <div className="total">
            <img src={LogoOutline} alt="Logo distance parcourue" />
            <p>{userData.statistics.totalDistance} Km</p>
          </div>
        </div>
      ) : null}
    </section>
  );
}
