import React, {useEffect, useState } from 'react'
import { BounceLoader } from 'react-spinners';
import "./Loading.css"
export default function LoadingPage({children}) {
    const[loading,setLoading]=useState(false);
    useEffect(()=>{
      window.scroll({
        top:0,
        behavior:"smooth"
        
            })
     setLoading(true);
     setTimeout(()=>{
      setLoading(false);
     },3000)
    },[])
  return (
  <>
    {loading? 
     <div className="load">
      <div className="inner-load">
      <BounceLoader
          size={70}
          color={"#9352b3"}
          loading={loading}
          
        />
        
      </div>
       
     </div>
    :
   <>{children}</>
    }
  </>
  )
}
