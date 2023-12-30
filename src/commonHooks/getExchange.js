import axios from "axios";
import { useState } from "react";

function useGetCryptoList() {
  
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const getExchange = async (params) => {
    console.log(params,'ppppaa')
    try {
      setData(null);
      setLoading(true);
      const res = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_PUBLIC_URL}/get_conversion`,
        params
      });
      setData(res?.data);
    } catch (error) {
      setData(error?.response?.data || error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    trigger: getExchange,
    data,
    loading,
  };
}

export default useGetCryptoList;
