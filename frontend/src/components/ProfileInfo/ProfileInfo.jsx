import "../../styles/profileInfo.css";
import { useUser } from "../../hook/useUser";


export default function ProfileInfo() {
  const { userData, loading } = useUser();

  if (loading || !userData) {
    return <p>Chargement...</p>;
  }

  let heightInMeters;
  if (userData.profile.height >= 100) {
    heightInMeters = `1m${userData.profile.height - 100}`; 
  } else {
    heightInMeters = `0.${userData.profile.height}`; 
  }
  
  return (
    <div className="perso-profile-info">
      <h2>Votre Profile</h2>
      <p>Age: {userData.profile.age}</p>
      <p>Genre: {userData.profile.gender === "female" ? "Femme" : "Homme"}</p>
      <p>
        Taille: {heightInMeters}
      </p>
      <p>Poids: {userData.profile.weight}kg</p>
    </div>
  );
}
