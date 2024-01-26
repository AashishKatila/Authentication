import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./context/userContext";
import useFetch from "./custom-hook/useFetch";
import CustomInput from "./CustomInput";

export default function Login() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();

  // const { allUsers, isLoading, isError, fetchData } = useFetch("login", "POST");

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

    try {
      setLoading(true);

      const response = await fetch("https://rest-api-bjno.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const responseData = await response.json();

      if (response.ok) {
        setData(responseData);
        console.log("ID added to localStorage", responseData.data._id);
        localStorage.setItem("userId", responseData.data._id);
        setLoggedIn(true);
        navigate("/home");
      } else {
        setError(responseData.message || "An error occurred while loading the data");
      }
    } catch (err) {
      setError("Something went wrong! Please try again later.");
    } finally {
      setLoading(false);
    }
  };


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
      {loading && <p>Loading...</p>}

      {error && <p className="text-red-600">Invalid Username or password</p>}
    </form>
  );
}
