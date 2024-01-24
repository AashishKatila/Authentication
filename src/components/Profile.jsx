import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext, { AuthContext } from "./context/userContext";

const Profile = () => {
  const userId = localStorage.getItem("userId");
  const [alldata, setAlldata] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate()
  
  const {loggedIn,setLoggedIn} = useContext(AuthContext)
  // console.log(values)


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://rest-api-bjno.onrender.com/users"
        );
        if (!response.ok) {
          throw new Error("API request failed");
        }
        const data = await response.json();
        setAlldata(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = (id ) => {
    console.log(id);
    fetch(`https://rest-api-bjno.onrender.com/delete/${id}`, {
      method: "DELETE",
    })
      .then((resp) => resp.json())
      .then(() => {
        // setAlldata((values) => {
        //   return values.filter((item) => item.id != id);
        // });
        alert("User deleted");
        localStorage.removeItem("userId")
        navigate('/')
      });
  };

  const Logout = () =>{
    localStorage.removeItem("userId")
    setLoggedIn(false)
    navigate('/')
  }

  return (
    <div className="ml-10">
      <div className="text-2xl font-bold mb-4 ml-24">All Profiles</div>
      {isLoading && <p>Loading data...</p>}
      {error && <p>Error: {error.message}</p>}
      {alldata.length > 0 && (
        <>
          {alldata.map(
            (item,index) =>
               (
                <div className="grid grid-cols-2 text-lg mx-20 mt-2 items-center  py-4" key={index}>


                  {/* Information  */}
                  <div className="grid grid-cols-2">
                    <div className="mx-4">
                      <span className="font-bold">Name</span>: {item.firstName} {item.lastName}
                    </div>
                    <div><span className="font-bold">Email</span>: {item.email}</div>
                  </div>

                  {/* Buttons  */}
                  <div className=" flex items-center">
                    <button className="py-1 px-4 bg-green-500 text-white rounded-lg mx-2">
                      Update
                    </button>
                    <button
                      className="py-1 px-4 bg-red-500 rounded-lg mx-2"
                      onClick={() =>handleDelete(item._id)}
                    >
                      Delete
                    </button>

                    <button
                      className="py-1 px-4 bg-blue-500 rounded-lg mx-2"
                      onClick={Logout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )
          )}
        </>
      )}

    </div>

  );
};

export default Profile;
