import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
export const FavContext=createContext(null);
export default function FavContextProvider({children}) {
  let [count,setCount]=useState(0);
  let [favList,setFavList]=useState(localStorage.getItem('favorite')?JSON.parse(localStorage.getItem('favorite')):[]);
  useEffect(()=>{
   localStorage.setItem("favorite",JSON.stringify(favList))
  },[favList])
 async function addToFav(showId,base){
    try{
      let res=await axios.get(`https://api.themoviedb.org/3/${base}/${showId}?api_key=${process.env.REACT_APP_API_KEY}`);
      let item=res.data;
     setFavList([...favList,item]);
  const token=localStorage.getItem("token");
  let objData={
    showId,
    type:base
  }
  const {data}=await axios.post(`https://movify-node-js.onrender.com/fav`,objData,{headers:{Authorization:`Heba__${token}`}});
     return data;     
    }catch(err){console.error("Somthing went wrong try again",err)}
 }
 async function getFavList(){
    try{
  const token=localStorage.getItem("token");
  const{data}=await axios.get(`https://movify-node-js.onrender.com/fav/get`,{headers:{Authorization:`Heba__${token}`}})
   setCount(data.count);
   if(data.fav){
      data.fav.map(async(sh)=>{
         let res=await axios.get(`https://api.themoviedb.org/3/${sh.type}/${sh.showId}?api_key=${process.env.REACT_APP_API_KEY}`);
         let item=res.data;
        setFavList([...favList,item]);
      })
   }
   return data;
    }catch(error){console.error("Something went wrong try again",error)}
 }
 async function removeFromFav(showId){
    try{
        let objData={
            showId
        }
        const token=localStorage.getItem("token");
        const{data}=await axios.patch(`https://movify-node-js.onrender.com/fav/removeItem`,objData,{headers:{Authorization:`Heba__${token}`}})
        setFavList(favList.filter((item)=>item.id!==showId))
        return data;
    }catch(error){console.error("Something went wrong try again",error)}
 }
 useEffect(()=>{
   const items=localStorage.getItem("favorite");
   if(items){
     setFavList(JSON.parse(items));
   }
 },[])
     useEffect(()=>{
       localStorage.setItem("favorite",JSON.stringify(favList))
     },[favList])
    return <FavContext.Provider value={{count,addToFav,getFavList,removeFromFav,favList}}>{children}</FavContext.Provider>
}
