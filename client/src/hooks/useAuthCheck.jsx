import { useEffect } from "react";
import useAuthStore from "../store/AuthStore";

export const useAuthCheck = () => {
  const { authCheck, user, isAuthenticated, loading } = useAuthStore();

  useEffect(() => {
    authCheck(); // run only once on mount
  }, []);

  return { user, isAuthenticated, loading };
};
