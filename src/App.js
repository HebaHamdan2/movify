import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout.jsx"
import { ToastContainer } from "react-toastify";
import VideosContaxtProvider from "./components/Videos/VideosContaxt.jsx";
import Getall from "./components/SearchPagination/Getall.jsx";
import Home from "./Pages/Home/Home.jsx";
import TVShows from "./Pages/TVShows/TVShows.jsx";
import MovieList from "./Pages/MovieList/MovieList.jsx";
import DetailsPage from "./Pages/Details/DetailsPage.jsx";
import DetailsTVPage from "./Pages/Details/DetailsTVPage.jsx";
import TVtrending from "./Pages/AllTrendingPage/TVtrending.jsx";
import MovieTrending from "./Pages/AllTrendingPage/MovieTrending.jsx";
import PageNotFound from "./Pages/PageNotFound/PageNotFound.jsx";
import Register from "./components/Auth/Register/Register.jsx";
import Login from "./components/Auth/Login/Login.jsx";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import FavContextProvider from "./components/Contexts/FavStore.jsx";
import WatchContextProvider from "./components/Contexts/Watchlist.jsx";
import Watchlist from "./Pages/Watchlist/Watchlist.jsx";
import Protected from "./components/Protected/Protected.jsx";
import Favorite from "./Pages/Favorite/Favorite.jsx";
import { Offline, Online } from "react-detect-offline";
import LoadingPage from "./components/loading/Loading.jsx";

export default function App() {
let [user,setUser]=useState(null);
function getUser(){
  let token=localStorage.getItem('token');
  let user=jwtDecode(token);
  setUser(user);
}
useEffect(()=>{
if(localStorage.getItem('token')){
  getUser();
}
},[])
  let routers = createBrowserRouter([
    {
      path: "",
      element:<LoadingPage><Layout user={user} setUser={setUser} /></LoadingPage> ,
      children: [
        { index: true, element:<Home /> },
        { path: "list", element: <Getall /> },
        { path: "tvlist", element: <TVShows /> },
        { path: "movieList", element: <MovieList /> },
        { path: "movieList/details", element: <DetailsPage /> },
        { path: "tvlist/details", element: <DetailsTVPage /> },
        { path: "trendingtv", element: <TVtrending /> },
        {path:"login",element:<Login getUser={getUser}/>},
        {path:"register",element:<Register/>},
        {path:"watchlist",element:<Protected><Watchlist/></Protected> },
        {path:"favorite",element:<Protected><Favorite/></Protected> },
        { path: "trendingmovies", element: <MovieTrending /> },
        { path: "*", element: <PageNotFound /> },
      ],
    },
  ]);
  return (
    
    <>
     <Online>
     <VideosContaxtProvider>
     <WatchContextProvider><FavContextProvider> <ToastContainer /> <RouterProvider router={routers}></RouterProvider> </FavContextProvider> </WatchContextProvider>   
       </VideosContaxtProvider>
     </Online>
     <Offline>
      <PageNotFound/>
     </Offline>
    
    </>
   
  );
}
