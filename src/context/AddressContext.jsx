"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@/components/auth/AuthContext";

const AddressContext = createContext();

export function AddressProvider({ children }) {
  const { user, isLoggedIn } = useAuth();
  const [address, setAddressState] = useState(null);

  /* 🔑 storage key per user */
  const storageKey = user?.email ? `leebah-address-${user.email}` : null;

  /* LOAD address on login */
  useEffect(() => {
    if (isLoggedIn && storageKey) {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setAddressState(JSON.parse(saved));
      }
    } else {
      setAddressState(null);
    }
  }, [isLoggedIn, storageKey]);

  /* SAVE address */
  const setAddress = (data) => {
    setAddressState(data);
    if (storageKey) {
      localStorage.setItem(storageKey, JSON.stringify(data));
    }
  };

  /* CLEAR on logout */
  const clearAddress = () => {
    // DO NOT remove from localStorage
    // Only clear state
    setAddressState(null);
  };

  return (
    <AddressContext.Provider value={{ address, setAddress, clearAddress }}>
      {children}
    </AddressContext.Provider>
  );
}

export const useAddress = () => useContext(AddressContext);
