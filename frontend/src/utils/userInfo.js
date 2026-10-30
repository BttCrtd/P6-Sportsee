import mockData from "../data/data.json";

const API_USER_INFO_URL = import.meta.env.VITE_API_USER_INFO_URL;

export async function getUserInfo(token) {
  const DATA_SOURCE = import.meta.env.VITE_DATA_SOURCE || "api";

  if (DATA_SOURCE === "mock") {
    const user = mockData.find((user) => user.id === token);

    if (!user) {
      throw new Error("Utilisateur Mock introuvable");
    }

    const runningData = user.runningData;

    const totalDistance = runningData
      .reduce((sum, session) => sum + session.distance, 0)
      .toFixed(1);

    const totalSessions = runningData.length;

    const totalDuration = runningData.reduce(
      (sum, session) => sum + session.duration,
      0,
    );

    const totalCalories = runningData.reduce(
      (sum, session) => sum + session.caloriesBurned,
      0,
    );

    return {
      profile: {
        firstName: user.userInfos.firstName,
        lastName: user.userInfos.lastName,
        createdAt: user.userInfos.createdAt,
        age: user.userInfos.age,
        gender: user.userInfos.gender,
        weight: user.userInfos.weight,
        height: user.userInfos.height,
        profilePicture: user.userInfos.profilePicture,
        goal: user.goal,
      },
      statistics: {
        totalDistance,
        totalSessions,
        totalDuration,
        totalCalories,
      },
    };
  }

  const response = await fetch(`${API_USER_INFO_URL}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des informations utilisateur");
  }

  return await response.json();
}