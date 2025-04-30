import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import Spinner from "./Spinner";

function PublicRoute({ children }) {
  const navigate = useNavigate();
  const { isAuthenticated, isAuthLoading } = useAuth();

  useEffect(() => {
    if (isAuthenticated && !isAuthLoading) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, isAuthLoading, navigate]);

  if (isAuthLoading) return <Spinner />;

  return !isAuthenticated ? children : null;
}

export default PublicRoute;
