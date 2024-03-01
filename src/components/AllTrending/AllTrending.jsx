import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../SearchPagination/Getall.css";
import "./../../App.css"
import "../loading/Loading.css"
import { BounceLoader } from "react-spinners";
export default function Showall({ base }) {
  let [currPage, setCurrPage] = useState(1);
  let [totalPages, setTotalPages] = useState(1);
  let [items, setItems] = useState([]);
let[loading,setLoading]=useState(false);
  async function getList() {
    try {
      let { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/${base}/week?api_key=${process.env.REACT_APP_API_KEY}`,
        {
          params: {
            page: currPage,
          },
        }
      );
      setLoading(true);
      setItems(data.results.slice(0, 15));
      setTotalPages(data.total_pages);
    } catch (err) {
      console.error("Something Went Wrong ,Try again", err);
    }
  }
  const navigatePages = (direction) => {
    if (direction === "prev" && currPage > 1) {
      setCurrPage(currPage - 1);
    } else if (direction === "next" && currPage < totalPages) {
      setCurrPage(currPage + 1);
    }
  };
useEffect(()=>{  window.scrollTo({top: 0, left: 0, behavior: 'smooth'});},[])
  useEffect(() => {
    getList();
  }, [currPage]);

  return (
    <>
        <div className="Shows py-5">
        {loading?
         <div className="container py-5">
         <div className="row ">
           {items.map((show, index) => (
             <div className="col-lg-4 col-md-6 col-sm-12 show " key={index}>
               <div className="show-box mb-30">
                 <div className="listing-container">
                   <div className="listing-image">
                     {show.poster_path ? (
                       <img
                         src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                         alt={`${show.title}${show.name}`}
                       />
                     ) : (
                       <img
                         src="../../../assets/notfound.png"
                         alt="notfound"
                       />
                     )}

                     <div className="overlayy">
                       {base === "tv" ? (
                         <Link
                           to="../tvlist/details"
                           state={{ id: show.id }}
                           className="btn btn-main"
                         >
                           details
                         </Link>
                       ) : (
                         <Link
                           to="../movieList/details"
                           state={{ id: show.id }}
                           className="btn btn-main"
                         >
                           details
                         </Link>
                       )}
                     </div>
                   </div>
                   <div className="listing-content">
                     <div className="inner">
                       <h2 className="title">
                         {show.title
                           ? show.title.split(" ").slice(0, 3).join(" ")
                           : show.name.split(" ").slice(0, 3).join(" ")}
                       </h2>
                       <p>{show.overview.slice(0, 90)}..</p>
                     </div>
                   </div>
                 </div>
               </div>{" "}
             </div>
           ))}
         </div>

         <div className="buttons justify-content-center text-align-center text-center">
           {currPage > 1 && (
             <button
               className="prevBtn d-inline-block pr-5"
               onClick={() => navigatePages("prev")}
             >
               <i className="fa-solid fa-angles-left"></i>
             </button>
           )}
           <p className=" d-inline-block">Pages | {currPage}</p>
           {currPage < totalPages && (
             <button
               className="nextBtn  d-inline-block pr-5"
               onClick={() => navigatePages("next")}
             >
               <i className="fa-solid fa-angles-right"></i>
             </button>
           )}
         </div>
       </div>
        :<>
           <div className="load">
      <div className="inner-load">
      <BounceLoader
          size={70}
          color={"#9352b3"}
          loading={loading}
          
        />
        
      </div></div>
       
        </>}      
       
      </div>
        
       
    
    </>
  );
}
