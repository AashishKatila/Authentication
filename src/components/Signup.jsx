import React, { useState } from "react";
import { useFormik } from "formik";
import CustomInput from "./CustomInput";
import { useNavigate } from "react-router-dom";

const validate = (values) => {
  const errors = {};

  if (!values.firstName) {
    errors.firstName = "Required";
  } else if (values.firstName.length > 15) {
    errors.firstName = "Must be 15 characters or less";
  }

  if (!values.lastName) {
    errors.lastName = "Required";
  } else if (values.lastName.length > 20) {
    errors.lastName = "Must be 20 characters or less";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  return errors;
};

const Signup = () => {
  const navigate = useNavigate()
  const [registered, setRegistered] = useState(false);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validate,
    onSubmit: async (values) => {
      try {
        const response = await fetch(
          "https://rest-api-bjno.onrender.com/register",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values), // Send all form values
          }
        );
        if (response.ok) {
          setRegistered(true);
          navigate('/login')
        } else {
          const errorJson = await response.json();
          setError(errorJson.message || "Registration failed!");
        }
      } catch (error) {
        setError("Something went wrong! Please try again later.");
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col px-20  pt-4 pb-4  "
    >
      <label htmlFor="firstName" className="text-xl mr-5 mb-4">First Name:</label>

      <input
        type="text"
        id="firstName"
        name="firstName"
        className="text-black px-2"
        {...formik.getFieldProps("firstName")}
      />
      {/* <CustomInput
        type={"text"}
        placeholder={"Firstname"}
        {...formik.getFieldProps("firstname")}
      /> */}

      {formik.touched.firstName && formik.errors.firstName && (
        <div className="error">{formik.errors.firstName}</div>
      )}

      <br />

      <label htmlFor="lastName" className="text-xl mr-5 mb-4">Last Name:</label>

      <input
        type="text"
        id="lastName"
        name="lastName"
        className="text-black px-2"
        {...formik.getFieldProps("lastName")}
      />
      {formik.touched.lastName && formik.errors.lastName && (
        <div className="error">{formik.errors.lastName}</div>
      )}
      <br />

      <label htmlFor="email" className="text-xl mr-5 mb-4">Email:</label>

      <input
        type="email"
        id="email"
        className="text-black px-2"
        name="email"
        {...formik.getFieldProps("email")}
      />
      {formik.touched.email && formik.errors.email && (
        <div className="error">{formik.errors.email}</div>
      )}
      <br />

      <label htmlFor="password" className="text-xl mr-5 mb-4">Password:</label>

      <input
        type="password"
        id="password"
        name="password"
        className="text-black px-2"
        {...formik.getFieldProps("password")}
      />
      {formik.touched.password && formik.errors.password && (
        <div className="error">{formik.errors.password}</div>
      )}
      <br />

      <button className="text-xl bg-green-600 px-4 py-1 text-white rounded-xl mt-2" type="submit" disabled={formik.isSubmitting}>
        {formik.isSubmitting ? "Registering..." : "Register"}
      </button>
      {registered && <p className="mt-2 text-xl text-green-500">Congrats successfull person</p>}
    </form>
  );
};

export default Signup;
