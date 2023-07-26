import axios from "axios";
import { useEffect, useState } from "react";
import useSWR from "swr";

export const useToken = (config) => {
  const [token, setToken] = useState("");

  const fetcher = async (config) => await axios(config).then((res) => res.data);

  const {
    data,
    error,
    isLoading: isApiResponseLoading,
  } = useSWR(config, fetcher);

  useEffect(() => {
    if (isApiResponseLoading) {
      return;
    }

    if (error) {
      setToken(
        error.response && error.response.data
          ? JSON.stringify(error.response.data, null, 2)
          : "Something went wrong"
      );
    }

    if (data) {
      setToken(JSON.stringify(data, null, 2));
    }
  }, [data, error, isApiResponseLoading]);
  //   console.log(token);

  return { token };
};
