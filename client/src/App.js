
import './App.css';
import MainHeader from './components/header-section/MainHeader';
import MainIndex from './components/main-section/MainIndex';
import Navigation from './components/navigation-section/Navigation';
import React, { useState, useEffect } from 'react'; 


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
  return (
    <div className="App">
          <MainHeader/>
          <Navigation/>
          <MainIndex token={token}/>
    </div>

  );
}

export default App;
