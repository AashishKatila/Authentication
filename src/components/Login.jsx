import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./context/userContext";
import CustomInput from "./CustomInput";
import { useMutation } from "@tanstack/react-query";
import LoadingSpinner from "./LoadingSpinner";

export default function Login() {
  const { setLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("https://rest-api-bjno.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status ${response.status}`);
      }
      const json = await response.json();
      console.log(json)
      localStorage.setItem("userId", json.data._id);
      setLoggedIn(true);
      navigate("/home");
    },
    onSuccess: () => {
      // Invalidate and refetch
      console.log("Successful");
    },
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    mutation.mutate();

  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col px-20 pt-4 pb-4 ">
      <CustomInput
        label="Email"
        type="email"
        id="email"
        name="email"
        value={userData.email}
        onChange={handleChange}
        required
      />

      <CustomInput
        label="Password"
        type="password"
        id="password"
        name="password"
        value={userData.password}
        onChange={handleChange}
        required
      />

      <button
        type="submit"
        className="text-xl bg-green-600 px-4 py-1 text-white rounded-xl"
        disabled={loading}
      >
        {loading ? "Logging In..." : "Login"}
      </button>

      {error && <p className="text-red-600">{error}</p>}
    </form>
  );
}
