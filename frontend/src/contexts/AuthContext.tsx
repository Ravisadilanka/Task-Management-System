import {
  createContext,
  useEffect,
  useState,
} from "react";

import api from "@/services/api";
import type { User } from "@/types/auth";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (token: string, user: User) => void;
  logout: () => Promise<void>;
}

export const AuthContext =
  createContext<AuthContextType | null>(null);

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] =
    useState<User | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
  try {
    const response = await api.post("/auth/refresh");

    login(
      response.data.accessToken,
      response.data.user
    );
  } catch {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    delete api.defaults.headers.common.Authorization;

    setUser(null);
  } finally {
    setLoading(false);
  }
};

  const login = (
    token: string,
    user: User
  ) => {
    localStorage.setItem(
      "accessToken",
      token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    api.defaults.headers.common.Authorization =
      `Bearer ${token}`;

    setUser(user);
  };

  const logout = async () => {
  try {
    await api.post("/auth/logout");
  } catch (error) {
    console.error(error);
  } finally {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    delete api.defaults.headers.common.Authorization;

    setUser(null);
  }
};

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};