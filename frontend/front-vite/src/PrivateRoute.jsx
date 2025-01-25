import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  // If the user is authenticated (i.e., token exists), render the child component(s)
  // If not, redirect to the login page
  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
