import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PATH_ADMIN, PATH_AUTH, PATH_DATA_ENTRY, PATH_SUPER_ADMIN } from "../constants/routes";
import { message } from "antd";

interface User {
  email: string;
  firstName: string;
  lastName: string;
  id: number;
  role: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {

  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate(); // Use the navigate hook from react-router-dom to navigate to different routes

  
  // On component mount, load user from local storage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  
  //   login function should store the data in the context and localStorage and navigate to the dashboard according to role
  const login = (user: User) => {


        setUser(user); // Set the user in the context
        localStorage.setItem("user", JSON.stringify(user)); // Set the user in localStorage

        // Redirect to the dashboard
        if (user.role.toLocaleLowerCase() === "admin") {
            // Redirect to the admin dashboard
            navigate(PATH_ADMIN.dashboard);
        } else if (user.role.toLocaleLowerCase() === "data entry") {
            // Redirect to the data entry dashboard
            navigate(PATH_DATA_ENTRY.dashbord);
        } else if (user.role.toLocaleLowerCase() === "super admin") {
            // Redirect to the super admin dashboard
            navigate(PATH_SUPER_ADMIN.dashboard);
        }
    };


  const logout = () => {
    setUser(null); // Clear the user in the context
    localStorage.removeItem("user"); // Clear the user from localStorage
    navigate(PATH_AUTH.signin); // Redirect to the login page
    message.success("You have been logged out successfully"); 
  };




  console.log("User - authprovider:", user);
  return (
    <AuthContext.Provider value={{ user, setUser, login , logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
