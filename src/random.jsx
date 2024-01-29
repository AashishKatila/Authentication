import { useState, useEffect } from "react";

const useFetch = (url, method) => {
  const [allUsers, setAllUsers] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [fetchedResponse, setFetchedResponse] = useState(false);

  const fetchData = async (values) => {
    try {
      setIsLoading(true);

      const response = await fetch(`https://rest-api-bjno.onrender.com/${url}`, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      setFetchedResponse(response.ok);

      if (!response.ok) {
        // For login component error 401
        if (response.status === 401) {
          throw new Error("Invalid username or password");
        } else {
          throw new Error(`Error : ${response.status} `);
        }
      }

      const responseData = await response.json();

      // console.log("Request:", { method, url });
      // console.log("Response:", response);
      // console.log("Data:", responseData);


      setAllUsers(responseData);
      setIsError(false);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
   }, [url, method]);

  return { allUsers, isLoading, isError, fetchData };
};

export default useFetch;





  // const { isLoading, error, data } = useQuery({
  //   queryKey: ["users"],
  //   queryFn: () =>
  //     fetch(`${baseUrl}/id/${userKoId}`).then((res) =>
  //     // {console.log("qyery fn vitra");
  //       res.json()
  //     ),
  // });

  // useEffect(()=>{
  //   fetchData()
  // },[])