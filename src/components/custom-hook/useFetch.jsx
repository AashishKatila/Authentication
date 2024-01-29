// Updated useFetch hook
import { useQuery } from "@tanstack/react-query";

const useFetch = (url, method = "GET") => {
  const { isLoading, error, data } = useQuery(
    // Use an object as the first argument
    { queryKey: [url, method] },
    {queryFn: async () => {
      const response = await fetch(`https://rest-api-bjno.onrender.com/${url}`, {
        method,
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    }},
    {
      // Disable automatic refetching
      enabled: false,
    }
  );

  return { isLoading, error, data };
};

export default useFetch;
