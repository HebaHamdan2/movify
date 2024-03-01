import React, { useContext, useState } from "react";
import Slider from "react-slick";
import "./Trending.css";
import { Link } from "react-router-dom";
import { VideosContaxt } from "../Videos/VideosContaxt.jsx";
import YouTube from "react-youtube";
import OverlayComp from "../OverlayComp/OverlayComp.jsx";
import { useLimitHooks } from "../Hooks/getSpecificLimitHooks.jsx";
export default function Trending({ base }) {
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
  let [open, setOpen] = useState(false);
  let url = `https://api.themoviedb.org/3/trending/${base}/week?api_key=${process.env.REACT_APP_API_KEY}`;

  let trending = useLimitHooks(url, 8);
  let [videos, setVideos] = useState([]);

  const { getVideos } = useContext(VideosContaxt);
  async function getVideosFun(id) {
    url = `https://api.themoviedb.org/3/${base}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}`;

    let data = await getVideos(url);
    const trailer = data.find((video) => video.type === "Trailer");
    setVideos(trailer);
  }
  return (
    <>
      <div className="trending py-5">
        <div className="container ">
          <div className="row text-align-center m-auto align-items-center">
            <div className="col-md-9 ">
              {base === "movie" ? (
                <h2>Trending Movies</h2>
              ) : (
                <h2>Trending TV Shows</h2>
              )}{" "}
            </div>
            <div className="col-md-3">
              {base === "tv" ? (
                <Link className="main-btn" to="trendingtv">
                  View All <i className="fa-solid fa-angles-right"></i>
                </Link>
              ) : (
                <Link className="main-btn" to="trendingmovies">
                  View All <i className="fa-solid fa-angles-right"></i>
                </Link>
              )}
            </div>
          </div>
          <div className="row py-4">
            <div className="slider-container ">
              <Slider {...settings}>
                {trending.map((trend, index) => (
                  <div key={index} className="card p-2 rounded border-0">
                    <div className="position-relative">
                      {trend.poster_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w500/${trend.poster_path}`}
                          alt="trending"
                        />
                      ) : (
                        <img
                          src="../../../assets/notfound.png"
                          alt="notfound"
                        />
                      )}

                      <div className="overlay">
                        <div className=" row text-center justify-content-between  align-items-center">
                          <p>{Math.round(trend.vote_average * 10) / 10}/10</p>

                          <div
                            className="play-btn py-5 w-50 m-auto"
                            onClick={() => {
                              getVideosFun(trend.id);
                              setOpen(!open);
                            }}
                          >
                            <i className=" fa-solid fa-play"></i>
                          </div>

                          {base === "movie" ? (
                            <Link
                              to="movieList/details"
                              state={{ id: trend.id }}
                            >
                              {trend.title.split(" ").slice(0, 5).join(" ")}
                            </Link>
                          ) : (
                            <Link to="tvlist/details" state={{ id: trend.id }}>
                              {trend.name.split(" ").slice(0, 4).join(" ")}
                            </Link>
                          )}
                          <p>
                            {trend.release_date}
                            {trend.first_air_date}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}{" "}
              </Slider>
            </div>
          </div>
        </div>
        <OverlayComp isOpen={open} onClose={() => setOpen(!open)}>
          <YouTube videoId={videos?.key} style={{ height: "100vh" }} />
        </OverlayComp>
      </div>
    </>
  );
}
