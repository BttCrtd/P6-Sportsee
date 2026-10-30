import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

function ProtectedRoute() {
  const { userData, loading } = useContext(UserContext);

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (!userData) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;