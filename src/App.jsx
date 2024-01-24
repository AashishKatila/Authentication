import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import "./App.css";
import Profile from "./components/Profile";
import { AuthContext } from "./components/context/userContext";

const App = () => {
  const { loggedIn } = useContext(AuthContext);
  // console.log(loggedIn);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        {loggedIn ? (
          <Route path="/profile" element={<Profile />} />
        ) : (
          <Route exact path="*" element={<Login />} />
         )}  
         {/* Checks all the path whether it has recieved anything or not and if not then foes to the given path */}
      </Routes>
    </>
  );
};

export default App;
