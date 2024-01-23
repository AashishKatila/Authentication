import React,{useState} from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate()

  const value = localStorage.getItem("userId")
  if(value){
    loggedIn === true
  }
  console.log(value)

  const handleLogin = async (e) => {
    e.preventDefault();
    try { 
      const response = await fetch("https://rest-api-bjno.onrender.com/users");
      const data = await response.json();
      setUserData(data);
      for (const user of data) {
        if (user.email === email && user.password === password) {
          console.log(user)
          localStorage.setItem("userId",user._id);
          break;
        }
      }
      navigate('/profile')
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col px-20  pt-4 pb-4 ">
        <label htmlFor="" className="text-xl mr-5 mb-4">Email</label>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="text-black px-2"
      />
      <br/>
      <label htmlFor="" className="text-xl mr-5 mb-4">Password</label>
      <input
        type="password"
        placeholder="Password"
        value={password}
        className="text-black px-2"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      
      <button type="submit" className="text-xl bg-blue-500 px-4 py-1 text-white rounded-xl mt-2" >Login</button>
    </form>
  );
};

export default Login;
