export const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
};

export const getRoleFromToken = () => {
  // TEMP: backend not ready
  return "admin";
};
