import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext, { AuthContext } from "./context/userContext";

const Navbar = () => {
  const { loggedIn } = useContext(AuthContext);
  return (
    <div className="flex justify-center mt-10 mb-6">
      {!loggedIn ? (
        <Link to="/">
          <div className="text-xl mx-4 ">Login</div>
        </Link>
      ) : (
        <Link to="/profile">
          <div className="text-xl mx-4 ">Profile</div>
        </Link>
      )}
      <Link to="/signup">
        <div className="text-xl mx-4">Signup</div>
      </Link>
    </div>
  );
};

export default Navbar;
