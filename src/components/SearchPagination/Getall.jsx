import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Getall.css";
export default function Getall({ base }) {
  let [currPage, setCurrPage] = useState(1);
  let [totalPages, setTotalPages] = useState(1);
  let [searchQuery, setSearchQuery] = useState("");
  let [shows, setShows] = useState([]);
  async function getList() {
    try {
      const api = searchQuery
        ? `https://api.themoviedb.org/3/search/${base}?api_key=${process.env.REACT_APP_API_KEY}`
        : `https://api.themoviedb.org/3/discover/${base}?api_key=${process.env.REACT_APP_API_KEY}`;
      let { data } = await axios.get(api, {
        params: {
          query: searchQuery,
          page: currPage,
        },
      });

      setShows(data.results.slice(0, 15));
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
  const showAll = () => {
    getList();
    setCurrPage(1);
  };
  useEffect(() => {
    getList();
  }, [currPage, searchQuery]);
  return (
    <>
      <div className="searching pt-5">
        <div className="container">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Shows Title"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
            />
            <button className="main-btn btn input-group-text" onClick={showAll}>
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="Shows py-5">
        <div className="container py-5">
          <div className="row ">
            {shows.map((show, index) => (
              <div className="col-lg-4 col-md-6 col-sm-12 show " key={index}>
                <div className="show-box mb-30">
                  <div className="listing-container">
                    <div className="listing-image">
                      {show.poster_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                          alt={`${show.title}`}
                        />
                      ) : (
                        <img
                          src="../../../assets/notfound.png"
                          alt="notfound"
                        />
                      )}

                      <div className="overlayy">
                        <Link
                          to="details"
                          className="btn btn-main"
                          state={{ id: show.id }}
                        >
                          details
                        </Link>
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
      </div>
    </>
  );
}
