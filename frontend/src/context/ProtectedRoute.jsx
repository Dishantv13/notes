import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ROUTE_PATH } from "../enum/routePath";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to={ROUTE_PATH.LOGIN} replace />;
  }

  return children;
};

export default ProtectedRoute;
