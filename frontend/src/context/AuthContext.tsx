// src/context/AuthContext.js
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

type user = {
  email: string;
  password: string;
};

type AuthContextType = {
  user: user | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  token: string | undefined;
  role: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<user | null>(null);
  const [token, setToken] = useState<string | undefined>();
  const [role, setRole] = useState<string | null>(null);
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        {
          email,
          password,
        }
      );
      setUser(response.data.user);
      const tokenVal = response.data.token.replace(/"/g, "");
      setToken(response.data.token);
      setRole(response.data.user.role);
      console.log("tokenVal", tokenVal);
      console.log("tokenVal", response.data.user.role);

      if (response.data.user.role === "student") {
        navigate("/courses");
      } else if (response.data.user.role === "admin") {
        navigate("/admin/enrolls");
      } else {
        navigate("/");
      }

      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("role", JSON.stringify(response.data.user.role));
      localStorage.setItem("token", JSON.stringify(response.data.token));
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    // check if a user is already authenticated
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    setUser(user || (storedUser ? JSON.parse(storedUser) : null));
    setToken(token || (storedToken !== null ? storedToken : undefined));
    setRole(role || (storedRole ? JSON.parse(storedRole) : null));
  }, []);
  return (
    <AuthContext.Provider value={{ user, login, logout, token, role }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
