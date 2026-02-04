"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 🔁 Load login state on refresh
  useEffect(() => {
    const stored = localStorage.getItem("lebah-auth");
    if (stored === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  // ✅ Fake login (until backend)
  const login = () => {
    localStorage.setItem("lebah-auth", "true");
    setIsLoggedIn(true);
  };

  // 🚪 Logout
  const logout = () => {
    localStorage.removeItem("lebah-auth");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
