import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./context/userContext";
import useFetch from "./custom-hook/useFetch";

export default function Login() {

  
  const navigate = useNavigate();
  const { setLoggedIn } = useContext(AuthContext);

  const {allUsers,isLoading,isError,fetchData } = useFetch("login","POST")

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = async (e) =>{
    e.preventDefault()
    if(userData.email && userData.password){
      fetchData(userData)
    }else{
      console.log("Enter name and pw")
    }
  }

  // if(isLoading){
  //   return<div>Loading....</div>
  // }
  // if(isError){
  //   return<div>Error fetching data</div>
  // }
  if (allUsers){
    console.log("User Login Success",allUsers)
    localStorage.setItem("userId",allUsers.data._id)
    setLoggedIn(true)
    navigate('/home')
  }

  
  return (
    <form onSubmit={handleLogin} className="flex flex-col px-20  pt-4 pb-4 ">
      <label className="text-xl mr-5 mb-4">Email:</label>
      <input
        type="email"
        name="email"
        value={userData.email}
        onChange={handleChange}
        required
        className="text-black px-2"
      />
      <br />
      <label className="text-xl mr-5 mb-4">Password:</label>
      <input
        type="password"
        name="password"
        value={userData.password}
        onChange={handleChange}
        required
        className="text-black px-2"
      />

      <br />
      <button type="submit">Login</button>
      {isLoading && <p>Loading...</p> 
      }

      {isError && <p className="text-red-600">Invalid Username or password</p>}
    </form>
  );
}
