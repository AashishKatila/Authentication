import { useQuery } from '@tanstack/react-query';

const useFetchData = (url) => {
  const { isPending, error, data } = useQuery({
    queryKey: [url],
    queryFn: () =>
      fetch(`https://rest-api-bjno.onrender.com/${url}`).then((res) =>
        res.json(),
      ),
  });

  return { isPending, error, data };
};

export default useFetchData;