import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./context/userContext";
import useFetch from "./custom-hook/useFetch";
import CustomInput from "./CustomInput";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "./LoadingSpinner";

export default function Login() {

  const { setLoggedIn } = useContext(AuthContext);

  const queryClient = useQueryClient();
  //is our entry point to interacting with our query cache. It returns the instance of the current QueryClient

  const fetchLogin = async (userData) => {
    const resp = await fetch("https://rest-api-bjno.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    return data;
  };

  const navigate = useNavigate();

  const { mutate, isLoading, error } = useMutation(fetchLogin);

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

      const response = await fetch("https://rest-api-bjno.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const responseData = await response.json();

      if (response.ok) {
        // console.log("ID added to localStorage", responseData.data._id);
        localStorage.setItem("userId", responseData.data._id);
        setLoggedIn(true);
        navigate("/home");
      } else {
        
        console.log("Error");
      }
    } catch (err) {
      console.error("Something went wrong! Please try again later.");
      console.log(err);
    } finally {
      console.log("Try catch ends");
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

      {error && <p className="text-red-600">Invalid Username or password</p>}
    </form>
  );
}
