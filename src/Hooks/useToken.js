import { useEffect, useState } from "react";

const useToken=(email)=>{
    const [token, setToken]=useState('');

   useEffect(()=>{
    if(email){
    //     fetch(`https://doctors-portal-server-ten-vert.vercel.app/jwt?email=${email}`)
    // .then(res=>res.json())
    // .then(data=>{
    //     if(data.accessToken){
            localStorage.setItem('accessToken', "fake token");
            setToken("fake token");
    //     }
    // });
    }
   },[email])
   return [token];
}
export default useToken;