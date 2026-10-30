import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export function usePerformance() {
  return useContext(UserContext);
}
