import axios from "axios";
import { useState,useEffect } from "react";

function useGetCryptoList() {
  
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const getCryptoList = async () => {
    try {
      setData(null);
      setLoading(true);
      const res = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_PUBLIC_URL}/get_crypto_list`,
      });
      setData(res?.data);
    } catch (error) {
      setData(error?.response?.data || error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    getCryptoList();
  },[])
  return {
    getCryptoList,
    data,
    loading,
  };
}

export default useGetCryptoList;
