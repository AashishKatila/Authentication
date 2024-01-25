import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import "./App.css";
import Home from "./components/Home";
import { AuthContext } from "./components/context/userContext";
import Profile from "./components/Profile";

const App = () => {
  const { loggedIn } = useContext(AuthContext);
  // console.log(loggedIn); 

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/profile" element={<Profile />} />
        {/* {loggedIn && (
          <Route path="/profile" element={<Profile />} />
          ) 
        } */}
          {/* <Route exact path="*" element={<Navigate to='/login' />} /> */}
         {/*   '*' Checks all the path whether it has recieved anything or not and if not then foes to the given path */}
      </Routes>
    </>
  );
};

export default App;

