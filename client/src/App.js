import { Route, Routes } from "react-router-dom";
import "./App.css";
import Auth from "./components/authorization/Auth";
import MainHeader from "./components/header-section/MainHeader";
import MainIndex from "./components/main-section/MainIndex";
import Navigation from "./components/navigation-section/Navigation";
import React, { useState, useEffect } from "react";
import ViewUsers from "./components/users/ViewUsers";
import RoomFeedById from "./components/main-section/RoomFeedById";
import UpdateUser from "./components/users/UpdateUser";

function App() {
  const [token, setToken] = useState("");
  const [currentId, setCurrentId] = useState("");
  const [isAdmin, setIsAdmin] = useState(Boolean);

  function updateToken(newToken) {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  }

  function updateCurrentId(newCurrentId) {
    setCurrentId(newCurrentId);
    localStorage.setItem("CurrentId", newCurrentId);
  }

  function updateIsAdmin(checkIsAdmin) {
    setIsAdmin(true);
    localStorage.setItem("Admin", checkIsAdmin);
  }

  //getting the token:
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  useEffect(() => {
    const currentId = localStorage.getItem("CurrentId");
    if (currentId) {
      setCurrentId(currentId);
    }
  }, []);

  useEffect(() => {
    const isAdmin = localStorage.getItem("Admin");
    if (isAdmin) {
      setIsAdmin(isAdmin);
    }
  }, []);

  useEffect(() => {
    document.body.classList.add("background");
  }, []);
  return (
    <div className="App">
      <MainHeader />
      <Navigation />

      {/* MAIN CONTENT AREA */}
      <Routes>
        <Route path="/auth" element={<Auth updateToken={updateToken} updateCurrentId={updateCurrentId} updateIsAdmin={updateIsAdmin} />} />
        <Route
          path="/rooms/view-all"
          element={<MainIndex token={token} />}
        />
        <Route path="/feed/:id" element={<RoomFeedById currentId={currentId} isAdmin={isAdmin} token={token} />} />
        <Route
          path="/"
          element={
            token ? (
              <MainIndex updateToken={updateToken} token={token} />
            ) : (
              <Auth
                updateCurrentId={updateCurrentId}
                updateToken={updateToken}
                updateIsAdmin={updateIsAdmin}
              />
            )
          }
        />
        <Route
          path="/view-users"
          element={
            <ViewUsers currentId={currentId} isAdmin={isAdmin} token={token} />
          }
        />
        <Route path="update-user/:id" element={<UpdateUser token={token} currentId={currentId} />} />
      </Routes>
    </div>
  );
}

export default App;
