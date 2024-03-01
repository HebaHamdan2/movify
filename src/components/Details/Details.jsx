import React, { useContext, useEffect,useState } from "react";
import "./Details.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { VideosContaxt } from "../Videos/VideosContaxt.jsx";
import OverlayComp from "../OverlayComp/OverlayComp.jsx";
import YouTube from "react-youtube";
import "../Trending/Trending.css";
import ShowDetail from "../showDetail/ShowDetail.jsx";
import Similar from "../Similar/Similar.jsx";
import Controll from "../ControlButtons/Controll.jsx";
import  "../loading/Loading.css";
import { BounceLoader } from "react-spinners";
export default function Details({ base }) {
  const location = useLocation();
  let { id } = location.state;
  let [detail, setDetail] = useState({});
  let [open, setOpen] = useState(false);
  let [loading,setLoading]=useState(false);
 let [videos, setVideos] = useState([]);
  const { getVideos } = useContext(VideosContaxt);
  let [genres, setGenres] = useState([]);
  let[lang,setLang]=useState([]);
  async function getVideosFun(id){
    let data = await getVideos(
      `https://api.themoviedb.org/3/${base}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}`
    );
    setLoading(true);
    const trailer = data?.find((video) => video.type === "Trailer");
    setVideos(trailer);
  }
 


  async function getDetails() {
    try {
      let { data } = await axios.get(
        `https://api.themoviedb.org/3/${base}/${id}?api_key=${process.env.REACT_APP_API_KEY}`
      );
      setLoading(true);
      setDetail(data);
      setGenres(data.genres);
      setLang(data.spoken_languages);
    } catch (err) {
      console.error("Something Went Wrong , Try again", err);
    }
  }
  function convertTime(num) {
    let hours = num / 60;
    let rhours = Math.floor(hours);
    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);
    return rhours + "h " + rminutes + "m";
  }
  
  useEffect(()=>{  window.scrollTo({top: 0, left: 0, behavior: 'smooth'});},[])
    useEffect(() => {
    getDetails();
  },[id]);
  return (
    <>
      <div className="details"></div>
  {loading?<div className="info ">
        <div className="container">
          <div className="row d-flex ">
            <div className="col-md-12 ">
              <div className="show-poster">
               {detail.poster_path?<img
                  src={`https://image.tmdb.org/t/p/w500${detail.poster_path}`}
                  alt={detail.original_title}
                />:<img src='../../public/assets/notfound.png'  alt="detail"/>}
                
              </div>
              <div className="show-details">
                <h3 className="title">
                  {detail.title} {detail.name}
                </h3>
                <ul className="show-subtext">
                  {detail.runtime ? (
                    <li className="show-runtime">
                      {convertTime(detail.runtime)}
                    </li>
                  ) : (
                    ""
                  )}
                  {genres.map((genre, index) => (
                    <li className="genres" key={index}>
                      {(index ? "" : "") + genre.name}
                    </li>
                  ))}

                  <li>
                    {detail.release_date}
                    {detail.first_air_date}
                  </li>
                </ul>
                <div className="actions d-block-inline">
                  <div
                    className=" btn main-btn"
                    onClick={() => {
                      getVideosFun(detail.id);
                      setOpen(!open);
                    }}
                  >
                    trailer
                  </div>
<Controll id={id} base={base}/>
                <div className="pt-2"><span>{detail.vote_average}/10</span> - <span> {detail.vote_count} Ratings</span></div>
                
              </div>
            </div>
          </div>
        </div></div>
        <OverlayComp isOpen={open} onClose={() => setOpen(!open)}>
            <YouTube videoId={videos?.key} style={{ height: "100vh" }} />
        </OverlayComp>
     
</div> :<>
<div className="load">
      <div className="inner-load">
      <BounceLoader
          size={70}
          color={"#9352b3"}
          loading={loading}
          
        />
        
      </div></div>
</>}    
<ShowDetail detail={detail} base={base} lang={lang} ids={id}/>  
<Similar base={base} ids={id}/>
    </>
  );
}
