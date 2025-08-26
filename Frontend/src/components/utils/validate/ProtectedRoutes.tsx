import { useNavigate } from "react-router-dom";
import { ReactNode, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { decodedUser } from "../../../types";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the User object from localStorage
    const storedUser = localStorage.getItem("User");
    const decodedToken = storedUser && jwtDecode<decodedUser>(storedUser);
    if (decodedToken) {
      setIsAdmin(decodedToken.isAdmin);
    } else {
      setIsAdmin(false); // Set to false if there's no token
    }
  }, []);

  useEffect(() => {
    if (isAdmin === false) {
      navigate("/404"); // Redirect if user is not an admin
    }
  }, [isAdmin, navigate]);

  if (isAdmin === null) {
    return null; // Optionally render a loading state or nothing until isAdmin is determined
  }

  return <>{children}</>; // Render children if isAdmin is true
};

export default ProtectedRoute;
