"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { API } from "@/utils/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 🔁 Load user on refresh
  useEffect(() => {
    const stored = localStorage.getItem("lebah-user");
    if (stored) {
      setUser(JSON.parse(stored));
      setIsLoggedIn(true);
    }
  }, []);
  const updateProfile = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem("lebah-user", JSON.stringify(updatedUser));
  };

  // 📩 SEND OTP
  const sendOtp = async (email) => {
    const res = await fetch(`${API}/auth/send-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to send OTP");
  };

  // ✅ VERIFY OTP
  const verifyOtp = async (email, otp, name) => {
    const res = await fetch(`${API}/auth/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp, name }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "OTP verification failed");
    }

    const userData = {
      email,
      name: data.name,
      role: data.role,
    };

    localStorage.setItem("lebah-token", data.token);
    localStorage.setItem("lebah-user", JSON.stringify(userData));

    // 🔥 THIS WAS MISSING
    setUser(userData);
    setIsLoggedIn(true);
  };

  // 🚪 LOGOUT
  const logout = () => {
    localStorage.removeItem("lebah-token");
    localStorage.removeItem("lebah-user");
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        sendOtp,
        verifyOtp,
        updateProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
