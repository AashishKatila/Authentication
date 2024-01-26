import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import "./App.css";
import Home from "./components/Home";
import { AuthContext } from "./components/context/userContext";
import Profile from "./components/Profile";


const App = () => {
  
  const { loggedIn } = useContext(AuthContext);

  return (
    <>
      <Navbar />
      <Routes>
        {!loggedIn && <Route path="/login" element={<Login />} />}
        {loggedIn && <Route exact path="/profile" element={<Profile />} />}
        {loggedIn &&  <Route exact path="/home" element={<Home />} />}
        {!loggedIn &&<Route path="*" element={<Login />} />}
        {loggedIn &&<Route path="*" element={<Home />} />}
        {/*   '*' Checks all the path whether it has recieved anything or not and if not then goes to the given path */}
      </Routes>
    </>
  );
};

export default App;

//Remaining Loader component, toastify, react form hook, fix UI,check edge cases
