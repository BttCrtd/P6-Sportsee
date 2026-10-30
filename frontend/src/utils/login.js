import mockData from "../data/data.json";

const API_LOGIN_URL = import.meta.env.VITE_API_LOGIN_URL;

export async function login(username, password) {
  const DATA_SOURCE = import.meta.env.VITE_DATA_SOURCE || "api";

  if (DATA_SOURCE === "mock") {
  const user = mockData.find(
    (user) => user.username === username
  );

  if (!user || user.password !== password) {
    throw new Error("Erreur dans le mot de passe ou l'identifiant");
  }

  localStorage.setItem("token", user.id);

  return { token: user.id };
}

  const response = await fetch(`${API_LOGIN_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  localStorage.setItem("token", data.token);

  return data;
}

export function logout() {
  localStorage.removeItem("token");
}