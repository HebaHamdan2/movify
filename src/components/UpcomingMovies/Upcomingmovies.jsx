import React, { useContext, useState } from "react";
import { useLimitHooks } from "../Hooks/getSpecificLimitHooks.jsx";
import "./Upcomingmovie.css";
import OverlayComp from "../OverlayComp/OverlayComp.jsx";
import YouTube from "react-youtube";
import { VideosContaxt } from "../Videos/VideosContaxt.jsx";
import { Link } from "react-router-dom";
export default function Upcomingmovies() {
  let [open, setOpen] = useState(false);
  let [videos, setVideos] = useState([]);

  const { getVideos } = useContext(VideosContaxt);
  async function getVideosFun(id) {
    let data = await getVideos(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}`
    );
    setVideos(data);
  }
  let upcoming = useLimitHooks(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}`,
    3
  );

  return (
    <>
      <div className="Upcoming">
        <h2 className="py-3">Upcoming Movies</h2>
        <div className="container ">
          <div className="row d-flex justify-content-around py-5 col-md-4 col-sm-12 ">
            {upcoming.map((movie) => (
              <div className=" upCard position-relative " key={movie.id}>
               {movie.poster_path?  <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt="upcoming"
                />:<img src="../../../assets/notfound.png" alt="notfound"/>}
              
                <div className="overlay row justify-content-center text-align-center">
                  <div
                    className="play-btn py-5 w-50 m-auto"
                    onClick={() => {
                      getVideosFun(movie.id);
                      setOpen(!open);
                    }}
                  >
                    <i className=" fa-solid fa-play"></i>
                  </div>
                  <Link to="movieList/details" state={{ id: movie.id }}>
                    {movie.title.split(" ").slice(0, 5).join(" ")}
                  </Link>
                  <p>{movie.release_date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <OverlayComp isOpen={open} onClose={() => setOpen(!open)}>
          (
          <YouTube videoId={videos[1]?.key} style={{ height: "100vh" }} />)
        </OverlayComp>
      </div>
    </>
  );
}
