import { useEffect, useState } from "react";

const useFetch = (url, method) => {
  const [allUsers, setAllUsers] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [fetchedResponse,setFetchedResponse] = useState(false)

 
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
          setFetchedResponse(response.ok)
          console.log(fetchedResponse)
        // console.log("Request:", { method, url });
        console.log("Response:", response);
  
        if (!response.ok) {
          //For login component error 401
          if (response.status == 401) {
            throw new Error("Invalid username or password");
          } else {
            throw new Error(`Error : ${response.status} `);
          }
        }
        const responseData = await response.json();
        // console.log(responseData)
  
        setAllUsers(responseData);
        // setFetchedResponse(response.ok)
        // console.log("Logged In successfully");
        // console.log(responseData)
        // console.log(fetchedResponse)
  
        setIsError(false);
      } catch (error) {
        setIsError(true);
        // console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    // useEffect(()=>{

    // },[url,method])

  
  return { allUsers, isLoading, isError,fetchData };
};

export default useFetch;

//Remaining Loader component, toastify, react form hook, fix UI,check edge cases
