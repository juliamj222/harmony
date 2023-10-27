import Login from "./Login";
import Signup from "./Signup";
import { useState } from "react";

function Auth(props) {
  const [isLogin, setIsLogin] = useState(true);

  function handleSwicth() {
    setIsLogin(!isLogin);
  }

  return (
    <>
      {isLogin ? (
        <Login updateToken={props.updateToken} handleSwicth={handleSwicth} />
      ) : (
        <Signup updateToken={props.updateToken} handleSwicth={handleSwicth} />
      )}
    </>
  );
}

export default Auth;
