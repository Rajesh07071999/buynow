import { Navigate } from "react-router-dom";

const GuestRoute = ({ children }) => {
  const user =(localStorage.getItem("token"));
  return user ? <Navigate to="/home" /> : children;
};

export default GuestRoute;
