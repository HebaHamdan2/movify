import React, { useContext, useEffect} from 'react'
import { Helmet } from 'react-helmet'
import SubHeader from '../../components/subHeader/SubHeader.jsx'
import { WatchContext } from '../../components/Contexts/Watchlist.jsx'
import "./Watchlist.css"
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom'
export default function Watchlist() {
let{detail,removeFromWatchList,getwatchList}=useContext(WatchContext);
async function removeFromWatchListFun(id){
  let res= await removeFromWatchList(id);
  if(res.message==="success"){
    toast.success("Remove successfully");
  } 
}
async function getwatchListFun(){
await getwatchList();
 
}
useEffect(()=>{getwatchListFun()},[detail])

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Watchlist Page</title>
                <meta name='whatchlist' content='this is movify whatchlist page' />
            </Helmet>
            <SubHeader pname={'My Watchlist'} />
           <div className=" watch py-10"> 
   <div className="container">
    <div className="row d-flex justify-content-center align-items-center ">
 {detail.map((sh,index)=>(  
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
     <button className='btn main-btn mb-3' onClick={()=>removeFromWatchListFun(sh.id)}>Remove</button>
      {sh.first_air_date?  <Link to='../tvlist/details' state={{id:sh.id}} className='btn main-btn mx-1 mb-3'>Show now</Link>:  <Link to='../movieList/details' state={{id:sh.id}} className='btn main-btn mx-1 mb-3'>Show now</Link>}
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
