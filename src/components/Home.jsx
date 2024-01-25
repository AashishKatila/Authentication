import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext, { AuthContext } from "./context/userContext";
import useFetch from "./custom-hook/useFetch";


const Home = () => {

  const { isLoading, isError, allUsers, fetchData } = useFetch("users", "GET");

  const userKoId = localStorage.getItem("userId");

  const navigate = useNavigate();

  //   const fetchData = async () => {
  //     try {
  //       setIsLoading(true);
  //       const response = await fetch(
  //         "https://rest-api-bjno.onrender.com/users"
  //       );
  //       const data = await response.json();
  //       setAllUsers(data);
  //     } catch (error) {
  //       setIsError(true);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    fetchData();
  }, []);


  return (
//     <div className="ml-10">
//       <div className="text-2xl font-bold mb-4 ml-24">All Profiles</div>
//       {isLoading && <p>Loading data...</p>}

//       {/* {!isLoading && allUsers */}
//       {!isLoading && !isError && allUsers && (
//         <div>
//          {allUsers.map((user) => (
//             <div
//               key={user._id}
//               className="grid grid-cols-4 text-lg mx-20 mt-2 items-center  py-4"
//             >
//               <div>Name:</div>
//               <div>
//                 {user.firstName} {user.lastName}
//               </div>
//             </div>
//           ))}
//         {/* : null} */}
//     </div>
//   )};

<div className="ml-10">
      <div className="text-2xl font-bold mb-4 ml-24">All Profiles</div>
      {isLoading && <p>Loading data...</p>}

      {!isLoading && !isError && allUsers && (
        <div>
          {allUsers.map((user) => (
            <div
              key={user._id}
              className="grid grid-cols-4 text-lg mx-20 mt-2 items-center  py-4"
            >
              <div>Name:</div>
              <div>
                {user.firstName} {user.lastName}
              </div>
            </div>
          ))}
        </div>
      )}

      {isError && <p>Error loading data</p>}
    </div>
  );
};

export default Home;

