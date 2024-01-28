import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
// import UserContext, { AuthContext } from "./context/userContext";
// import useFetch from "./custom-hook/useFetch";
import LoadingSpinner from "./LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import useFetch from "./custom-hook/useFetch";

const Home = () => {
  // const { isLoading, isError, allUsers, fetchData } = useFetch("users", "GET");

  const { isPending, error, data } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      fetch("https://rest-api-bjno.onrender.com/users").then((res) =>
        res.json()
      ),
  });

  // useEffect(() =>{
  //   fetchData
  // },[])

  if (isPending) return <LoadingSpinner />;

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="ml-10">
      <div className="text-2xl font-bold mb-4 ml-24">All Profiles</div>
      {/* {isLoading && <LoadingSpinner />} */}
      {isPending && <LoadingSpinner />}

      {/* {!isLoading && !isError && allUsers && ( */}
      <div>
        {data.map((user) => (
          <div
            key={user._id}
            className="grid grid-cols-4 text-lg ml-10 mt-2 items-center  py-4"
          >
            <div className="mx-5">
              <div>Name:</div>
              <div>
                {user.firstName} {user.lastName}
              </div>
            </div>
            <div className="mx-5">
              <div>Email:</div>
              <div>{user.email}</div>
            </div>
          </div>
        ))}
      </div>

      {error && <p>Error loading data</p>}
    </div>
  );
};

export default Home;
