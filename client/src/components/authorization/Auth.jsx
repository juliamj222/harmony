import Login from "./Login";
import Signup from "./Signup";
import { useState } from "react";

function Auth(props) {
  const [isLogin, setIsLogin] = useState(true);

  function handleSwitch() {
    setIsLogin(!isLogin);
  }

  return (
    <>
      {isLogin ? (
        <Login updateToken={props.updateToken} handleSwitch={handleSwitch} />
      ) : (
        <Signup updateToken={props.updateToken} handleSwitch={handleSwitch} />
      )}
    </>
  );
}

export default Auth;
