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
      <h2>Profile</h2>
      {isLoading && <p>Loading data...</p>}
      {error && <p>Error: {error.message}</p>}
      {alldata.length > 0 && (
        <>
            {/* {console.log(alldata)} */}
          {alldata.map(
            (item,index) =>
              item._id === userId && (
                <div key={index}>
                  {/* Information  */}
                  <div>
                    <div>
                      Name: {item.firstName} {item.lastName}
                    </div>
                    <div>Email: {item.email}</div>
                  </div>

                  {/* Buttons  */}
                  <div className="mt-4">
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
