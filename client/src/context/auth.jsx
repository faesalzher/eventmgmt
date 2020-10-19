import React, { createContext, useContext, useState } from 'react';
import jwtDecode from "jwt-decode";

// const initialState = {
//   staff_id: "a",
//   organization_id: ""
// };

if (localStorage.getItem("jwtToken")) {
  const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("jwtToken");
  } else {
    // initialState.staff_id = decodedToken.staff_id;
    // initialState.organization_id = decodedToken.organization_id;
  }
}

export function useAuth() {
  return useContext(AuthContext);
}
export const AuthContext = createContext();

export function AuthProvider(props) {
  const existingTokens = localStorage.getItem("jwtToken");
  const [authTokens, setAuthTokens] = useState(existingTokens);

  const setTokens = (data) => {
    localStorage.setItem("jwtToken", data);
    setAuthTokens(data);
  };

  return (
    <AuthContext.Provider
      value={{ 
        authTokens, 
        setAuthTokens: setTokens, 
        // organization_id: initialState.organization_id,
        // staff_id: initialState.staff_id,
      }}
      {...props}
    />
  );
}
