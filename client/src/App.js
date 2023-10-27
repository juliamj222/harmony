import "./App.css";
import Auth from "./components/authorization/Auth";
import React, { useState, useEffect } from "react";
import ViewUsers from "./components/users/ViewUsers";

function App() {
  const [token, setToken] = useState("");

  function updateToken(newToken) {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  useEffect(() => {
    document.body.classList.add("background")
  }, []);
  return (
    <div className="App">
      { token ? null : <Auth updateToken={updateToken} />}
      <Auth updateToken={updateToken} />
      <ViewUsers token={token}/>
    </div>
  );
}

export default App;
