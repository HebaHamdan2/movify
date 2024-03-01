import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { FavContext } from '../Contexts/FavStore.jsx';
import { WatchContext } from '../Contexts/Watchlist.jsx';
import axios from 'axios';
export default function Controll({id,base}) {
    let[resp,setRes]=useState(null);
  let[Favs,setFavs]=useState(null);
  const{addToFav,removeFromFav}=useContext(FavContext);
  const{addTowatchList,removeFromWatchList}=useContext(WatchContext);
  async function removeFromFavFun(showId){
    if(localStorage.getItem("token")===null){
      toast.info("Login first");
    }else{
      let res=await removeFromFav(Number(showId));
      if(res.message==="success"){   checkFav(Number(showId),base)
        toast.success("remove from favourite")
     
      }
    }
    
  }
  async function addToFavFun(showId,base){
    if(localStorage.getItem("token")===null){
      toast.info("Login first");
    }else{
      let res=await addToFav(Number(showId),base);
      if(res.message==="success"){ checkFav(Number(showId),base)
        toast.success("added to favourite successfully")
     
      }
    }
    
  } 
  async function addTowatchlistFun(showId,base){
    if(localStorage.getItem("token")===null){
      toast.info("Login first");
    }else{
      let res=await addTowatchList(Number(showId),base);
      if(res.message==="success"){
         checkWatch(Number(showId),base);
         toast.success("added to Watchlist successfully")
      }
    }
  };
  async function removeFromWatchListFun(showId){
    if(localStorage.getItem("token")===null){
      toast.info("Login first");
    }else{
      let res=await removeFromWatchList(Number(showId));
      if(res.message==="success"){
       checkWatch(Number(showId),base)
       toast.success("remove from Watchlist")
        
        
      }
    }
  }
  async function checkWatch(showId,base){
    try{
      let objData={
          showId:Number(showId),
          type:base
      }
      const token=localStorage.getItem("token");
      const{data}=await axios.patch(`https://movify-node-js.onrender.com/whatchlist/check`,objData,{headers:{Authorization:`Heba__${token}`}});
      if(data.message==="show is saved"){
       setRes(true);
      }else{
        setRes(false);
      }
  }catch(err){ console.error(err)}
  }
  async function checkFav(showId){
    try{
      let objData={
          showId:Number(showId),
          type:base
      }
      const token=localStorage.getItem("token");
      const{data}=await axios.patch(`https://movify-node-js.onrender.com/fav/check`,objData,{headers:{Authorization:`Heba__${token}`}});
      if(data.message==="show is saved"){
        setFavs(true);
      }else{
        setFavs(false);
      }
    }catch(err){ console.error(err)}
  }
 
    useEffect(()=>{
      checkFav(Number(id),base)
      checkWatch(Number(id),base) 
    },[resp,Favs])
  

  return (
   <>
   <div className="controls d-inline-block">
   {resp===true?
  <button
  className='btn main-btn mx-1'
  onClick={() => {
  removeFromWatchListFun(Number(id),base);checkWatch(Number(id))
  }}
>saved to watch later
</button>:<button className='btn main-btn mx-1'
                    onClick={() => {
                      addTowatchlistFun(Number(id),base);checkWatch(Number(id))
                    }}
                  >watch later
                  </button>} 
  

{Favs===true?
<i className='like   fa-solid fa-heart'  onClick={()=>{removeFromFavFun(Number(id),base);checkFav(Number(id),base)}}></i>:
<i className='like  fa-regular fa-heart 'onClick={()=>{addToFavFun(Number(id),base);checkFav(Number(id),base)}}></i>                 
} 
</div>
   </>
  )
}
