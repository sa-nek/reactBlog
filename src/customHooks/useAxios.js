import { useEffect, useState } from "react";
import axios from "axios";

const useAxios = (dURL) => {
  const [data, setData] = useState([]);
  const [fetchErr, setFetchErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const source = axios.CancelToken.source();

    const fetchData = async (url) => {
      setIsLoading(true);
      try {
        const response = await axios.get(url, {
          cancelToken: source.token,
        });
        if (isMounted) {
          setData(response.data);
          setFetchErr(null);
        }
      } catch (err) {
        if (isMounted) {
          setFetchErr(err.message);
          setData([]);
        }
      } finally {
        isMounted && setIsLoading(false);
      }
    };
    fetchData(dURL);
    const clean = () => {
      isMounted = false;
      source.cancel();
    };
    return clean;
  }, [dURL]);
  return { data, fetchErr, isLoading };
};
export default useAxios;
