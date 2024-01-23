import React, { useState } from "react";
import { useFormik } from "formik";



const Signup = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://rest-api-bjno.onrender.com/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });

      if (response.ok) {
        setRegistered(true);
      } else {
        const errorJson = await response.json();
        setError(errorJson.message || 'Registration failed!');
      }
    } catch (error) {
      setError('Something went wrong! Please try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col px-20  pt-4 pb-4 '>
      <label htmlFor="firstName">First Name:</label>
      <input
        type="text"
        id="firstName"
        name="firstName"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
        className='text-black px-2'
      />
      <br />
      <label htmlFor="lastName">Last Name:</label>
      <input
        type="text"
        id="lastName"
        name="lastName"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
        className='text-black px-2'
      />
      <br />

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className='text-black px-2'
      />
      <br />

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className='text-black px-2'
      />
      <br />

      <button type="submit" className='bg-[#5C5470] text-xl px-4 py-1 text-white rounded-xl mt-2'>Register</button>

      {registered && <p>Congratulations! You have registered successfully.</p>}
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default Signup;
