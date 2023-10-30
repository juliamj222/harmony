import { Route, Routes } from "react-router-dom";
import './App.css';
import Auth from "./components/authorization/Auth";
import MainHeader from './components/header-section/MainHeader';
import MainIndex from './components/main-section/MainIndex';
import Navigation from './components/navigation-section/Navigation';
import React, { useState, useEffect } from 'react'; 
import ViewUsers from "./components/users/ViewUsers";
import RoomFeedById from "./components/main-section/RoomFeedById";


function App() {
  const [token, setToken] = useState("");


  function updateToken(newToken) {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  }

//getting the token:
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, [])
  console.log(token)
  useEffect(() => {
    document.body.classList.add("background")
  }, []);
  return (
    <div className="App">
          <MainHeader/>
          <Navigation/>

{/* MAIN CONTENT AREA */}
      <Routes>
        <Route path="/auth" element={<Auth updateToken={updateToken}/>}/>
        <Route path="/rooms/view-all" element={ /* MOUNT HERE ROOM FEED? */ <MainIndex token={token}/>}/>
        <Route path="/feed/:id" element={<RoomFeedById token={token}/>}/>


      {/*   <Route path="/feed/:id" element={<RoomFeedById token={token}/>}/> */}

      </Routes>

      { token ? <MainIndex token={token} updateToken={updateToken}/> : <Auth updateToken={updateToken} />}
      <ViewUsers token={token}/>
    </div>
  );
}

export default App;
