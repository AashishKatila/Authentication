import React, { useState, useEffect, useContext } from "react";
import { FaUser } from "react-icons/fa";
import { AuthContext } from "./context/userContext";
import { useNavigate } from "react-router-dom";
import useFetch from "./custom-hook/useFetch";
import LoadingSpinner from "./LoadingSpinner";

const Profile = () => {
  const { setLoggedIn } = useContext(AuthContext);

  const baseUrl = "https://rest-api-bjno.onrender.com";

  const userKoId = localStorage.getItem("userId");
  const { allUsers, isLoading, isError, fetchData } = useFetch(
    `id/${userKoId}`,
    "GET"
  );

  useEffect(()=>{
    fetchData()
  },[])

  const navigate = useNavigate();


  const handleDelete = async (id) => {
    try {
      await fetch(`${baseUrl}/delete/${id}`, {
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

  return (
    <div>
      <div className="text-center text-2xl font-bold">Detailed Information</div>

      {isLoading && <LoadingSpinner />}

      {!isLoading && !isError && allUsers ? (
        <>
          <div className="grid grid-cols-3 text-lg mx-20 mt-2 items-center  py-4">
            {/* {console.log(allUsers)} */}

            <>
              <div>
                <FaUser size={50} />
              </div>
              <div>
                Name:
                {allUsers.firstName} {allUsers.lastName}
              </div>
              <div>Email: {allUsers.email}</div>
              {/* buttons  */}
              <div className="flex justify-center mt-10 ">
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
        </>
      ) : null}
    </div>
  );
};

export default Profile;
