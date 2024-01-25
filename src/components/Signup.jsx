import React, { useState } from "react";
import { useFormik } from "formik";
import useFetch from "./custom-hook/useFetch";
import { useNavigate } from "react-router-dom";
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
  const { isLoading, isError, allUsers, fetchData } = useFetch(
    "register",
    "POST"
  );

  const navigate = useNavigate();
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
        await fetchData(values);
        if (!isError) {
          setRegistered(true);
          navigate("/login");
        } else {
          console.error(
            "Registration failed:",
            errorJson.message || "Registration failed!"
          );
        }
      } catch (error) {
        console.error("Something went wrong! Please try again later.", error);
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col px-20  pt-4 pb-4  "
    >
      <CustomInput
        label="First Name"
        type="text"
        id="firstName"
        name="firstName"
        value={formik.values.firstName}
        onChange={formik.handleChange}
        error={formik.touched.firstName && formik.errors.firstName}
      />

      <br />

      <CustomInput
        label="Last Name"
        type="text"
        id="lastName"
        name="lastName"
        value={formik.values.lastName}
        onChange={formik.handleChange}
        error={formik.touched.lastName && formik.errors.lastName}
      />
      <br />

      <CustomInput
        label="Email"
        type="email"
        id="email"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && formik.errors.email}
      />
      <br />

      <CustomInput
        label="Password"
        type="password"
        id="password"
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && formik.errors.password}
      />
      <br />

      <button
        className="text-xl bg-green-600 px-4 py-1 text-white rounded-xl "
        type="submit"
        disabled={formik.isSubmitting}
      >
        {formik.isSubmitting ? "Registering..." : "Register"}
      </button>
      {registered && (
        <p className="mt-2 text-xl text-green-500">
          Congrats successfull person
        </p>
      )}
    </form>
  );
};

export default Signup;
