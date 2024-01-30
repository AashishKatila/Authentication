import React, { useContext, useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { AuthContext } from "./context/userContext";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import {
  useQuery,
} from '@tanstack/react-query'
import useFetchData from "./custom-hook/useFetch";

const Profile = () => {
  const { setLoggedIn } = useContext(AuthContext);
  const userKoId = localStorage.getItem("userId");

  const navigate = useNavigate();


  const { isPending, error, data } = useFetchData(`id/${userKoId}`)

  const handleDelete = async (id) => {
    try {
      await fetch(`https://rest-api-bjno.onrender.com/delete/${id}`, {
        method: "DELETE",
      });
      setLoggedIn(false);
      console.log("User deleted");
      localStorage.removeItem("userId");
      alert("User deleted");
      navigate("/login");
    } catch (error) {
      console.error("Deletion Failed: ", error);
    }
  };

  if (isPending) return <LoadingSpinner />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className="text-center text-2xl font-bold">Detailed Information</div>

      <div className="grid grid-cols-3 text-lg mx-20 mt-2 items-center py-4">
        <>
          <div>
            <FaUser size={50} />
          </div>
          <div>
            Name: {data.firstName} {data.lastName}
          </div>
          <div>Email: {data.email}</div>
          {/* buttons  */}
          <div className="flex justify-center mt-10">
            <button className="mx-4 px-4 py-1 rounded-md bg-green-600">
              Update
            </button>
            <button
              className="mx-4 px-4 py-1 rounded-md bg-red-600"
              onClick={() => handleDelete(userKoId)}
            >
              Delete
            </button>
          </div>
        </>
      </div>
    </div>
  );
};

export default Profile;
