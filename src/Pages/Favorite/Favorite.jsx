import React, { useContext, useEffect} from 'react'
import { Helmet } from 'react-helmet'
import SubHeader from '../../components/subHeader/SubHeader.jsx'
import { FavContext } from '../../components/Contexts/FavStore.jsx'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import "../Watchlist/Watchlist.css"
export default function Favorite() {
  let{removeFromFav,favList,getFavList}=useContext(FavContext);
  async function removeFromFavFun(id){
    let res= await removeFromFav(id);
    if(res.message==="success"){
      toast.success("Remove successfully");
  }}
  async function getFavListFun(){
await getFavList()
  }
      useEffect(()=>{
      getFavListFun()
      },[favList])
  return (
  <>
  <Helmet>
                <meta charSet="utf-8" />
                <title>Favorite Page</title>
                <meta name='favorite' content='this is movify favorite page' />
            </Helmet>
            <SubHeader pname={'My Favorite'} />
            <div className=" watch py-10"> 
   <div className="container">
    <div className="row d-flex justify-content-center align-items-center ">
    

 {favList.map((sh,index)=>(  
  <>
  
   <div className="col-md-4 col-sm-12">
 <div className="watch-later-item ">
   <div className="listing-container">
     <div className="listing-image " key={index}>
       <img  src={`https://image.tmdb.org/t/p/w500${sh.poster_path}`}  alt="whatchlist" /></div>  </div> 
      
     </div>
     
   </div>
   <div className="col-md-8 col-sm-12">
       <div className="listing-content">
         <h3 className="title">{sh.name}{sh.title}</h3>
          <p>{sh.overview}</p> 
     <button className='btn main-btn mb-3' onClick={()=>removeFromFavFun(sh.id)}>Remove</button>
      {sh.first_air_date?  <Link to='../tvlist/details' state={{id:sh.id}} className='btn main-btn mx-1 mb-3'>Show now</Link>:  <Link to='../movieList/details' state={{id:sh.id}} className='mb-3 btn main-btn mx-1'>Show now</Link>}
     </div>
       </div>
 </>))
 
 }
   </div>
  </div> 
</div> 
  </>
  )
}
