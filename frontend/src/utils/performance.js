
import mockData from "../data/data.json";

const API_USER_ACTIVITY_URL = import.meta.env.VITE_API_USER_ACTIVITY_URL;
const format = (date) => date.toISOString().split("T")[0];

export async function performance(token, startDate) {
  const DATA_SOURCE = import.meta.env.VITE_DATA_SOURCE || "api";

  const endDate = new Date();

  if (DATA_SOURCE === "mock") {
    const user = mockData.find((user) => user.id === token);

    if (!user) {
      throw new Error("Utilisateur Mock introuvable");
    }

    const start = new Date(startDate);
    const end = new Date(format(endDate));

    return user.runningData
      .filter((session) => {
        const sessionDate = new Date(session.date);

        return sessionDate >= start && sessionDate <= end;
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  const response = await fetch(
    `${API_USER_ACTIVITY_URL}${format(
      new Date(startDate)
    )}&endWeek=${format(endDate)}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des performances");
  }

  return await response.json();
}
