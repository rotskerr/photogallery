import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const userLoggedIn = localStorage.getItem('userLoggedIn') === 'true';

  if (!userLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;