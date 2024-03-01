import axios from 'axios';
import React, {  createContext, useEffect } from 'react'
export const VideosContaxt=createContext("");
export default function VideosContaxtProvider({children}) {
     async function getVideos(url){
        try{
          const {data}=await axios.get(url)
   return data.results;

        }catch(err){console.log(err);}
      }
      useEffect(()=>{
  
      },[])
  return <VideosContaxt.Provider value={{getVideos}}>
   {children}
   </VideosContaxt.Provider>
  }