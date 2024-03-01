import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
export const WatchContext=createContext(null);

export default function WatchContextProvider({children}) {
  let [count,setCount]=useState(0);
  let [detail,setDetail]=useState(localStorage.getItem('watchlist')?JSON.parse(localStorage.getItem('watchlist')):[]);
 async function addTowatchList(showId,base){
    try{
  let res=await axios.get(`https://api.themoviedb.org/3/${base}/${showId}?api_key=${process.env.REACT_APP_API_KEY}`);
  let item=res.data;
 setDetail([...detail,item]);
  const token=localStorage.getItem("token");
  let objData={
    showId,
    type:base
  }
  const {data}=await axios.post(`https://movify-node-js.onrender.com/whatchlist`,objData,{headers:{Authorization:`Heba__${token}`}});        
  return data;
    }catch(err){console.error("Somthing went wrong try again",err)}
   }
 async function getwatchList(){
    try{
      
  const token=localStorage.getItem("token");
   const {data}=await axios.get(`https://movify-node-js.onrender.com/whatchlist/get`,{headers:{Authorization:`Heba__${token}`}});
   setCount(data.count);
   if(data.watchlist){
      data.watchlist.map(async(sh)=>{
         let res=await axios.get(`https://api.themoviedb.org/3/${sh.type}/${sh.showId}?api_key=${process.env.REACT_APP_API_KEY}`);
         let item=res.data;
        setDetail([...detail,item]);
      })
   }
    }catch(error){console.error("Something went wrong try again",error)}
 }
 async function removeFromWatchList(showId){
    try{
        let objData={
            showId
        }
        const token=localStorage.getItem("token");
        const{data}=await axios.patch(`https://movify-node-js.onrender.com/whatchlist/removeItem`,objData,{headers:{Authorization:`Heba__${token}`}})
       setDetail(detail.filter((item)=>item.id!==showId))
        return data;
    }catch(error){console.error("Something went wrong try again",error)}
 }
 useEffect(()=>{
   const items=localStorage.getItem("watchlist");
   if(items){
     setDetail(JSON.parse(items));
   }
 },[])
     useEffect(()=>{
       localStorage.setItem("watchlist",JSON.stringify(detail))
     },[detail])
 
    return <WatchContext.Provider value={{setDetail,count,detail,addTowatchList,getwatchList,removeFromWatchList}}>{children}</WatchContext.Provider>
}
