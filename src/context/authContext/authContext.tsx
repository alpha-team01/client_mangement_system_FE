import { createContext, useContext, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
type AuthContextType = {
  currentUser: User | null;
  userLoggedIn: boolean;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, intilizeUser);
    return unsubscribe;
  }, []);

  async function intilizeUser(user : User | null) {
    if (user) {
      setCurrentUser( {...user });
      setUserLoggedIn(true);
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
    }
    setLoading(false);
  }

  const values = {
    currentUser,
    userLoggedIn,
    loading,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
