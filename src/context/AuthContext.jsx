import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [loggedUser, setLoggedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const getLoggedUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuthenticated(false);
        setIsAuthLoading(false);
        return;
      }

      setIsAuthLoading(true);
      const response = await axios.get(
        "https://notesapi-ebon.vercel.app/auth/me",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setLoggedUser(response.data.user);
      setIsAuthenticated(true);
    } catch (err) {
      console.error(err?.response?.data?.errors?.[0]?.msg);
      setLoggedUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsAuthLoading(false);
    }
  };

  useEffect(() => {
    getLoggedUser();
  }, []);

  // SignUp
  const signUp = async (name, email, password) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://notesapi-ebon.vercel.app/auth/signUp",
        {
          name,
          email,
          password
        }
      );
      localStorage.setItem("token", response.data.token);
      setLoggedUser(response.data.user);
      setIsAuthenticated(true);
      toast.success("Account created successfully");
      return true;
    } catch (err) {
      toast.error(
        err?.response?.data?.errors?.[0]?.msg || "Something went wrong."
      );
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://notesapi-ebon.vercel.app/auth/login",
        {
          email,
          password
        }
      );
      localStorage.setItem("token", response.data.token);
      setLoggedUser(response.data.user);
      setIsAuthenticated(true);
      toast.success("Login successful.");
      return true;
    } catch (err) {
      toast.error(err?.response?.data?.errors?.[0]?.msg || "Login failed.");
      setIsAuthenticated(false);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setLoggedUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        loggedUser,
        isAuthenticated,
        isAuthLoading,
        isLoading,
        signUp,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
