import { Navigate, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext.jsx";

export const RequiresAuth = ({ children }) => {
  const { loggedInUser } = useAuth();
  const location = useLocation();
  return loggedInUser ? (
    children
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
};
