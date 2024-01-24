import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext, { AuthContext } from "./context/userContext";

const Profile = () => {
  const userId = localStorage.getItem("userId");
  const [alldata, setAlldata] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMore, setViewMore] = useState(false);
  const navigate = useNavigate();

  const { loggedIn, setLoggedIn } = useContext(AuthContext);
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
  const handleViewMore = () => {
    // navigate('/viewmore')
    setViewMore(true);
    // console.log(viewMore);
  };

  const handleDelete = async (id) => {
    try {
      // console.log(id);
      await fetch(`https://rest-api-bjno.onrender.com/delete/${id}`, {
        method: "DELETE",
      });
      setLoggedIn(false);
      localStorage.removeItem("userId");
      alert("User deleted");
      navigate("/login");
    } catch (error) {
      console.error("Deletion Failed: ", error);
    }
  };

  const Logout = () => {
    localStorage.removeItem("userId");
    navigate("/");
    setLoggedIn(false);
  };

  return (
    <div className="ml-10">
      <div className="text-2xl font-bold mb-4 ml-24">All Profiles</div>
      {isLoading && <p>Loading data...</p>}
      {error && <p>Error: {error.message}</p>}
      {alldata.length > 0 && (
        <>
          {alldata.map((item, index) => (
            <div
              className="grid grid-cols-2 text-lg mx-20 mt-2 items-center  py-4"
              key={index}
            >
              {/* Information  */}
              <div className="grid grid-cols-2">
                <div className="mx-4">
                  <span className="font-bold">Name</span>: {item.firstName}{" "}
                  {item.lastName}
                </div>
                <div>
                  <span className="font-bold">Email</span>: {item.email}
                </div>
              </div>

              {/* Buttons  */}

              {item._id === userId && !viewMore ? (
                <button
                  className=" rounded-md bg-blue-500 mx-40 "
                  onClick={() => handleViewMore()}
                >
                  View More
                </button>
              ) : item._id === userId && viewMore ? (
                <div className=" flex items-center mt-5 ml-20">
                  <button
                    className="py-1 px-4 bg-green-500 text-white rounded-lg mx-2"
                    onClick={() => handleUpdate(item._id)}
                  >
                    Update
                  </button>

                  <button
                    className="py-1 px-4 bg-red-500 rounded-lg mx-2"
                    onClick={() => handleDelete(item._id)}
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
              ) : null}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Profile;
