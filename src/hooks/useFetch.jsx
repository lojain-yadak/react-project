import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function useFetch(url) {
 const [data, setData] = useState([]);
 const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState(null);

   const getData = async ()=>{
    try{
        const response = await axios.get(url);
        setData(response.data);
    }catch(err){
        setError(err);

    }finally{
        setIsLoading(false);
    }
   }
   useEffect(()=>{
    getData();
   },[]);
   return {data,isLoading,error}
}
