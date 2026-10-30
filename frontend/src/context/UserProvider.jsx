
import { useState } from "react";
import { UserContext } from "./UserContext";
import { getUserInfo } from "../utils/userInfo";
import { performance } from "../utils/performance";

export function UserProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const [performanceData, setPerformanceData] = useState(null);
  const [loading, setLoading] = useState(false);

  async function refreshUserData() {
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setUserData(null);
        setPerformanceData(null);
        return;
      }

      const data = await getUserInfo(token);
      setUserData(data);

      const dataPerformance = await performance(
        token,
        data.profile.createdAt,
      );

      setPerformanceData(dataPerformance);
    } catch (error) {
      console.error("Erreur lors du chargement des données :", error);
      setUserData(null);
      setPerformanceData(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <UserContext.Provider
      value={{
        userData,
        performanceData,
        loading,
        setUserData,
        refreshUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
