import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./context/userContext";
import useFetch from "./custom-hook/useFetch";

export default function Login() {
  // const [data, setData] = useState(null);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  
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

  if(isLoading){
    return<div>Loading....</div>
  }
  if(isError){
    return<div>Error fetching data</div>
  }
  if (allUsers){
    console.log("User Login Success",allUsers)
    localStorage.setItem("userId",allUsers.data._id)
    setLoggedIn(true)
    navigate('/home')
  }

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   fetch("https://rest-api-bjno.onrender.com/login", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(userData),
  //   })
  //     .then((res) => {
  //       setLoading(true);
  //       if (!res.ok) {
  //         throw new Error("Could not fetch data");
  //       }
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setData(data);
  //       console.log("ID added to localStorage", data.data._id);
  //       localStorage.setItem("userId", data.data._id);
  //       setLoggedIn(true);
  //       navigate("/home");
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       setLoading(false);
  //       setError(err.message || "An error occurred while loading the data");
  //     });

  //   if (!loading && !error) {
  //     console.log("User Login successfully!", data);
  //   } else {
  //     console.error(
  //       "Login failed:",
  //       error || "An error occurred while logging in."
  //     );
  //   }
  // };
  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }
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
    </form>
  );
}
