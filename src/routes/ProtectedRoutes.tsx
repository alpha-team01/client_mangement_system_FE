import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user } = useAuth();  // Access the user from AuthContext
  console.log("User - protected route:", user);
  
  // Check if the user is logged in and has the right role
  if (!user) {
    return <Navigate to="/auth/signin" replace />; // Redirect to sign-in if not logged in
  }

  if (!allowedRoles.includes(user.role.toLowerCase())) {
    return <Navigate to="/errors/403" replace />; // Redirect to "Forbidden" if role is not allowed
  }

  return children;  // If everything is fine, render the child components (protected page)
};

export default ProtectedRoute;
