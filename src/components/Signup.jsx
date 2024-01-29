import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomInput from "./CustomInput";
import { useMutation } from "@tanstack/react-query";

const Signup = () => {
  const navigate = useNavigate();
  const [registered, setRegistered] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

    const mutation = useMutation({
      mutationFn: async() =>{
        const response = await fetch("https://rest-api-bjno.onrender.com/register ", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status ${response.status}`);
      }else{
        setRegistered(true);
        navigate("/login");
      }
      }
    })
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    mutation.mutate()

    // try {
    //   const response = await fetch(
    //     "https://rest-api-bjno.onrender.com/register",
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(userData),
    //     }
    //   );

    //   if (response.ok) {
    //     setRegistered(true);
    //     navigate("/login");
    //   } else {
    //     console.log("Error");
    //   }
    // } catch (error) {
    //   console.error("Registration failed:", error);
    //   // Display user-friendly error message
    // }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col px-20 pt-4 pb-4">
      <CustomInput
        label="First Name"
        type="text"
        id="firstName"
        name="firstName"
        value={userData.firstName}
        onChange={handleChange}
      />

      <br />

      <CustomInput
        label="Last Name"
        type="text"
        id="lastName"
        name="lastName"
        value={userData.lastName}
        onChange={handleChange}
      />
      <br />

      <CustomInput
        label="Email"
        type="email"
        id="email"
        name="email"
        value={userData.email}
        onChange={handleChange}
      />
      <br />

      <CustomInput
        label="Password"
        type="password"
        id="password"
        name="password"
        value={userData.password}
        onChange={handleChange}
      />
      <br />

      <button
        className="text-xl bg-green-600 px-4 py-1 text-white rounded-xl"
        type="submit"
      >
        Register
      </button>

      {registered && (
        <p className="mt-2 text-xl text-green-500">Registration successful!</p>
      )}
    </form>
  );
};

export default Signup;
