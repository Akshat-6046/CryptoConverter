import axios from "axios";
import { useState,useEffect } from "react";

const useGetCurrencyList = () => {
  
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const getCurrencyList = async () => {
    try {
      setData(null);
      setLoading(true);
      const res = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_PUBLIC_URL}/get_currency_list`,
      });
      setData(Object.keys(res?.data?.data));
    } catch (error) {
      setData(error?.response?.data || error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    getCurrencyList();
  },[])
  return {
    data,
    loading,
  };
}

export default useGetCurrencyList;
