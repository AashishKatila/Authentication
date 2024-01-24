import { useState, createContext } from "react";


export const AuthContext = createContext();


const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("userId") ? true : false
  );
  
  const login = () => setLoggedIn(true);
  const logout = () => setLoggedIn(false);
  
  return (
    <AuthContext.Provider value={{ loggedIn,setLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
