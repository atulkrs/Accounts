import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, allowedRoles }) => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  if (!user || !user.token) {
    return <Navigate to='/' replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to='/' replace />; // role not allowed
  }

  return children;
};

export default PrivateRoute;
