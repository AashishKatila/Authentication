import React, { useState, useEffect, useContext } from "react";
import { FaUser } from "react-icons/fa";
import { AuthContext } from "./context/userContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {

  const [allUsers, setAllUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  

  const { setLoggedIn } = useContext(AuthContext);


  const baseUrl = 'https://rest-api-bjno.onrender.com'

  const userKoId = localStorage.getItem("userId")

  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${baseUrl}/id/${userKoId}`
        );
        const data = await response.json();
        setAllUsers(data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`${baseUrl}/delete/${id}`, {
        method: "DELETE",
      });
      setLoggedIn(false);
      console.log("User deleted")
      localStorage.removeItem("userId");
      alert("User deleted");
      navigate("/login");
    } catch (error) {
      console.error("Deletion Failed: ", error);
    }
  };


  return (
    <div>
      <h2>Detailed Information</h2>
      <FaUser />
      {!isLoading && (
        <>
          <div className="grid grid-cols-2 text-lg mx-20 mt-2 items-center  py-4">
            <div>
              Name:
              {allUsers.firstName} {allUsers.lastName}
            </div>
            <div>Email: {allUsers.email}</div>
            {/* buttons  */}
            <div className="flex mt-4">
              <button className="mx-4 px-4 py-1 rounded-md bg-green-600" >Update</button>
              <button className="mx-4 px-4 py-1 rounded-md bg-red-600" onClick={()=>handleDelete()}>Delete</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
