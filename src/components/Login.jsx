import React,{useState} from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://rest-api-bjno.onrender.com/users");
      const data = await response.json();
      setUserData(data);
      for (const user of data) {
        if (user.email === email && user.password === password) {
          setLoggedIn(true);
          break;
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
        <label htmlFor="" className="text-5xl">Email</label>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br/>
      <label htmlFor="">Password</label>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button type="submit">Login</button>
      {loggedIn?  <p className="text-green-500">Success!</p> : <p className="text-red-500">No Success</p>}
    </form>
  );
};

export default Login;
