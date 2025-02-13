import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

// A wrapper for protected routes
const PrivateRoute = ({ children }) => {
  const token = Cookies.get("adminToken");

  // If the token does not exist, redirect to login
  return token ? children : <Navigate to="/admin" />;
};

export default PrivateRoute;
