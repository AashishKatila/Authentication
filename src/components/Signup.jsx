import React, { useState } from "react";
import { useFormik } from "formik";
import CustomInput from "./CustomInput";

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
      className="flex flex-col px-20 pt-4 pb-4 text-black  "
    >
      <label htmlFor="firstName">First Name:</label>

      <input
        type="text"
        id="firstName"
        name="firstName"
        className="px-2"
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

      <label htmlFor="lastName">Last Name:</label>

      <input
        type="text"
        id="lastName"
        name="lastName"
        className="px-2"
        {...formik.getFieldProps("lastName")}
      />
      {formik.touched.lastName && formik.errors.lastName && (
        <div className="error">{formik.errors.lastName}</div>
      )}
      <br />

      <label htmlFor="email">Email:</label>

      <input
        type="email"
        id="email"
        className="px-2"
        name="email"
        {...formik.getFieldProps("email")}
      />
      {formik.touched.email && formik.errors.email && (
        <div className="error">{formik.errors.email}</div>
      )}
      <br />

      <label htmlFor="password">Password:</label>

      <input
        type="password"
        id="password"
        name="password"
        className="px-2"
        {...formik.getFieldProps("password")}
      />
      {formik.touched.password && formik.errors.password && (
        <div className="error">{formik.errors.password}</div>
      )}
      <br />

      <button className="text-white" type="submit" disabled={formik.isSubmitting}>
        {formik.isSubmitting ? "Registering..." : "Register"}
      </button>
      {registered && <p>COngrats on successfull registration</p>}
    </form>
  );
};

export default Signup;
