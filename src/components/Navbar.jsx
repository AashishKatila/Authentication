import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext, { AuthContext } from "./context/userContext";

const Navbar = () => {
  const { loggedIn, setLoggedIn } = useContext(AuthContext);
  const [forceUpdate, setForceUpdate] = useState(false);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("userId");
    setLoggedIn(false);
    navigate("/login");
  };

  useEffect(() => {
    setForceUpdate((prev) => !prev);
  }, [loggedIn]);

  return (
    <div className="flex justify-center mt-10 mb-6 items-center">
      {!loggedIn ? (
        <Link to="/login">
          <div className="text-xl mx-4 ">Login</div>
        </Link>
      ) : (
        <Link to="/home">
          <div className="text-xl mx-4 ">Home</div>
        </Link>
      )}
      {loggedIn && <Link to="/profile" className="text-xl mx-4">Profile</Link>}
      {!loggedIn ? (
        <Link to="/signup">
          <div className="text-xl mx-4">Signup</div>
        </Link>
      ) : (
        <button className="bg-blue-500 mx-2 text-xl rounded-md px-4 py-1" onClick={() => logout()}>
          Logout
        </button>
      )}
    </div>
  );
};

export default Navbar;
