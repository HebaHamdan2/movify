import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useLocation } from 'react-router-dom';
export default function ShowDetail({detail,base,lang}) {
  const location = useLocation();
  let { id } = location.state;
  let [director, setDirector] = useState("");
  let [prod, setProduction] = useState("");
 let [casts, setCast] = useState([]);
  let [images, setImages] = useState([]);   
  async function getCast() {
    try {
      let { data } = await axios.get(
        `https://api.themoviedb.org/3/${base}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}`
      );
      setCast(data.cast.slice(0, 4));
      const dir = data.crew.find((c) => c.known_for_department === "Directing");
      const coP = data.crew.find(
        (c) => c.known_for_department === "Production"
      );
      if (coP) {
        setProduction(coP.name);
      } else {
        setProduction("");
      }
      if (dir) {
        setDirector(dir.name);
      } else {
        setDirector("");
      }
    } catch (err) {
      console.error("Something Went Wrong , Try again", err);
    }
  }
    async function displayImages() {
        try {
          let { data } = await axios.get(
            `https://api.themoviedb.org/3/${base}/${id}/images?api_key=${process.env.REACT_APP_API_KEY}`
          );
          setImages(data.backdrops.slice(0, 4));
        } catch (err) {
          console.error("Something Went Wrong , Try again", err);
        }
      }
      useEffect(()=>{
        getCast();
        displayImages();
      })
  return (
    <>
     <div className="show-detail-main">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-sm-12">
              <div className="inner">
                <div className="storyline">
                  <h3 className="title">Storyline</h3>
                  <p>{detail.overview}</p>
                </div>
                <div className="show-media  position-relative">
                  <div className="container">
                    <h3 className="title"> Photos</h3>
                    <div className="media-container">
                      {images.map((im, index) => (
                        <div key={index}>
                          {im.file_path ? (
                            <img
                              src={`https://image.tmdb.org/t/p/w500${im.file_path}`}
                              className="media"
                              alt="pict"
                            />
                          ) : (
                            <img src='../../public/assets/notfound.png'  alt="upcoming"/>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-12">
              <div className="sidebar">
                <aside className="widget widget-show-details">
                  <h3 className="title">Details</h3>
                  <ul>
                    <li>
                      <strong>Release date: </strong>
                      {detail.release_date}
                      {detail.first_air_date}
                    </li>
                    <li>
                      <strong>Language: </strong>
                      {lang.map((lan, index) => (
                        <span className="language" key={index}>
                          {(index ? " ," : "") + lan.name}
                        </span>
                      ))}
                    </li>
                    <li>
                      <strong>Director: </strong>
                      {director}
                    </li>
                    <li>
                      <strong>Production Co: </strong>
                      {prod}
                    </li>
                    {base === "tv" ? (
                      <li>
                        <strong>Country: </strong>
                        {detail.origin_country}
                      </li>
                    ) : (
                      ""
                    )}
                  </ul>
                </aside>
                <aside className="widget widget-show-cast">
                  <h3 className="title">Cast</h3>
                  <ul className="cast-wrapper">
                    {casts.map((cast, index) => (
                      <li>
                        <div className="casts">
                          <span>
                          {cast.profile_path?(  <img
                              key={index}
                              src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                              alt={cast.name}
                            />):(<img src="../../../assets/notfound.png" alt="notfound"/>)} 
                         
                          </span>
                          <h6 className="name d-inline-block">{cast.name}</h6>
                        </div>
                      </li>
                    ))}
                  </ul>
                </aside>
              </div>
            </div>          
          </div>
        </div>
      </div>
    </>
  )
}
