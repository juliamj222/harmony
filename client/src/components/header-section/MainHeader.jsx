//sfc
//import logo from "../../assets/pet-logo.png";
import "./MainHeader.css";
const MainHeader = (props) => {
  return (
    <>
      <header className="d-flex justify-content-center align-items-center secondary-background">
        <div>
        {/* <img src={logo} alt="logo" className="App-logo" /> */}
        <h2>Harmony Hotel</h2>
        </div>
      </header>
    </>
  );
};

export default MainHeader;