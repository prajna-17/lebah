"use client";

import { createContext, useContext, useState } from "react";

const AddressContext = createContext();

export function AddressProvider({ children }) {
  const [address, setAddress] = useState(null);

  return (
    <AddressContext.Provider value={{ address, setAddress }}>
      {children}
    </AddressContext.Provider>
  );
}

export function useAddress() {
  return useContext(AddressContext);
}
