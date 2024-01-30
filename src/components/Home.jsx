import React, { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";
import {
  useQuery,
} from '@tanstack/react-query'
import useFetchData from "./custom-hook/useFetch";

const Home = () => {

  // const { isPending, error, data } = useQuery({
  //   queryKey: ['allUsers'],
  //   queryFn: () =>
  //     fetch('https://rest-api-bjno.onrender.com/users').then((res) =>
  //       res.json(),
  //     ),
  // })

  const { isPending,error,data} = useFetchData('users')

  if (isPending) return <LoadingSpinner />;

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="ml-10">
      <div className="text-2xl font-bold mb-4 ml-24">All Profiles</div>

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
    </div>
  );
};

export default Home;
