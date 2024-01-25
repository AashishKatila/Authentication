import {useState } from "react";

const useFetch = (url, method) => {
  const [allUsers, setAllUsers] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchData = async (values) => {
    try {
      setIsLoading(true);

      const response = await fetch(
        `https://rest-api-bjno.onrender.com/${url}`,
        {
          method: method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );

      // console.log("Request:", { method, url });
      // console.log("Response:", response);

      if (!response.ok) {
        if(response.status == 401){
          throw new Error("Invalid username or password")
        }else{
        throw new Error(`Error : ${response.status} `);
      }
    }
      const responseData = await response.json();
      setAllUsers(responseData);
      // console.log("Logged In successfully");
      // console.log(responseData)
      setIsError(false);
    } catch (error) {
      setIsError(true);
      // console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { allUsers, isLoading, isError, fetchData };

 
};

export default useFetch;
