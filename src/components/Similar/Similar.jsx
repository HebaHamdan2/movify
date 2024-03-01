import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link} from 'react-router-dom';
import Slider from 'react-slick';
import OverlayComp from '../OverlayComp/OverlayComp.jsx';
import YouTube from 'react-youtube';
import { VideosContaxt } from '../Videos/VideosContaxt.jsx';

export default function Similar({base,ids}) {
    let [similar, setSimilar] = useState([]);
    let [videos, setVideos] = useState([]);
    let [open, setOpen] = useState(false);
  const { getVideos } = useContext(VideosContaxt);
  async function getVideosFun(id) {
    let data = await getVideos(
      `https://api.themoviedb.org/3/${base}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}`
    );
    const trailer = data?.find((video) => video.type === "Trailer");
    setVideos(trailer);
  }
    const settings = {
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 2,
    
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              dots: true,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      };
      async function getSimilar() {
        try {
          let { data } = await axios.get(
            `https://api.themoviedb.org/3/${base}/${ids}/similar?api_key=${process.env.REACT_APP_API_KEY}`
          );
          setSimilar(data.results.slice(0, 8));
        } catch (err) {
          console.error("Something Went Wrong , Try again", err);
        }
      }
      useEffect(()=>{
        getSimilar()
      },[ids])
  return (
   <> <div className="similar">
   <div className="container">
     <h2 class="title">People who liked this also liked...</h2>

     <Slider {...settings}>
       {similar.map((s, index) => (
         <div key={index} className="card p-2 rounded border-0">
           <div className="position-relative">
         {s.poster_path? <img
               src={`https://image.tmdb.org/t/p/w500/${s.poster_path}`}
               alt="similar"
             />:(<img src="../../../assets/notfound.png" className='notfound' alt="notfound"/>)}   
             <div className="overlay">
               <div className=" row text-center justify-content-between  align-items-center">
                 <p>{Math.round(s.vote_average * 10) / 10}/10</p>

                 <div
                   className="play-btn py-5 w-50 m-auto"
                   onClick={() => {
                     getVideosFun(s.id);
                     setOpen(!open);
                   }}
                 >
                   <i className=" fa-solid fa-play"></i>
                 </div>
                 {base === "tv" ? (
                   <Link to="../tvlist/details" state={{id: s.id }}>
                     {s.name.split(" ").slice(0, 5).join(" ")}
                   </Link>
                 ) : (
                   <Link to="../movieList/details" state={{id: s.id }} >
                     {s.title.split(" ").slice(0, 5).join(" ")}
                   </Link>
                 )}
                 <p>{s.release_date}</p>
               </div>
             </div>
           </div>
         </div>
       ))}{" "}
     </Slider>
   </div>{" "}
 </div>
 <OverlayComp isOpen={open} onClose={() => setOpen(!open)}>
          <YouTube videoId={videos?.key} style={{ height: "100vh" }} />
        </OverlayComp>
   </>
  )
}
