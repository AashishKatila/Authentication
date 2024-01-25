import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./context/userContext";
import useFetch from "./custom-hook/useFetch";
import CustomInput from "./CustomInput";

export default function Login() {
  const navigate = useNavigate();
  const { setLoggedIn } = useContext(AuthContext);

  const { allUsers, isLoading, isError, fetchData } = useFetch("login", "POST");

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (userData.email && userData.password) {
      fetchData(userData);
    } else {
      console.log("Enter name and pw");
    }
  };

  if (allUsers) {
    console.log("User Login Success", allUsers);
    localStorage.setItem("userId", allUsers.data._id);
    setLoggedIn(true);
    navigate("/home");
  }

  return (
    <form onSubmit={handleLogin} className="flex flex-col px-20 pt-4 pb-4 ">
      <CustomInput
        label="Email"
        type="email"
        id="email"
        name="email"
        value={userData.email}
        onChange={handleChange}
        required
      />

      <CustomInput
        label="Password"
        type="password"
        id="password"
        name="password"
        value={userData.password}
        onChange={handleChange}
        required
      />

      <button
        type="submit"
        className="text-xl bg-green-600 px-4 py-1 text-white rounded-xl"
      >
        Login
      </button>
      {isLoading && <p>Loading...</p>}

      {isError && <p className="text-red-600">Invalid Username or password</p>}
    </form>
  );
}
