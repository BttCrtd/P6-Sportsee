import "../../styles/StatCard.css";
import {useUser} from "../../hook/useUser";

export default function StatCard({ type, id }) {
  const { userData, loading } = useUser();

  if (loading || !userData) {
    return <p>Chargement...</p>;
  }

  let text = "";
  let value1 = "";
  let value2 = "";

  if (type === "time") {
    text = "Temps total couru";
    value1 = `${Math.floor(userData.statistics.totalDuration / 60)}H`;
    value2 = `${userData.statistics.totalDuration % 60}min`;
  }

  if (type === "distance") {
    text = "Distance totale parcourue";
    value1 = `${userData.statistics.totalDistance}`;
    value2 = "km";
  }

  if (type === "session") {
    text = "Nombre de sessions";
    value1 = `${userData.statistics.totalSessions}`;
    value2 = "sessions";
  }
  if (type === "calories") {
    text = "Calories brûlées";
    value1 = `${userData.statistics.totalCalories}`;
    value2 = "calories";
  }

  if (type === "activity") {
    text = "Durée d'activitée";
    value1 = `${userData.statistics.totalDuration}`;
    value2 = "minutes";
  }

  if (type === "distance") {
    text = "Distance";
    value1 = `${userData.statistics.totalDistance}`;
    value2 = "km";
  }

  return (
    <article className="stat-card" id={id}>
      <p className="name">{text}</p>
      <p id="hours">
        {value1} <span id="min">{value2}</span>
      </p>
    </article>
  );
}
