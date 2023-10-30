import { API_USER_LOGIN } from "../../constants/endpoints";
import React, { useState } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";

function Login(props) {
  const [email, setEmail] = useState("admin1admin.com");
  const [password, setPassword] = useState("admin");

  async function handleSubmit(evt) {
    try {
      evt.preventDefault();
      // * Headers
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      // * Body
      const body = {
        email,
        password,
      };
      // * Request Options
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body),
      };
      // * Send Request
      const response = await fetch(API_USER_LOGIN, requestOptions);

      // * Get a Response
      const data = await response.json();
      props.updateToken(data.token);
      props.updateCurrentId(data.user._id);
      props.updateIsAdmin(data.user.isAdmin);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <div className="d-flex justify-content-center mt-5 h-auto" >
        <div className="p-5 rounded" style={{ width: "450px", backgroundColor: "var(--secondary)", color: "var(--tritary)" }}>
          <h2 className="text-center">LOGIN FORM</h2>
          <Form>
            {/* Form group Email */}
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="email@placeholder.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            {/* Form Group Email End */}
            {/* Form Group Password */}
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                id="password"
                name="password"
                placeholder="Enter your Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>
            {/* Form Group Password End */}
            {/* Buttons */}
            <div style={{display: "flex", justifyContent: "space-around"}}>
              <button className="button rounded" onClick={props.handleSwitch}>Change to Signup</button>
              <button className="button rounded" title="Login" onClick={handleSubmit}>
                Login
              </button>
            </div>
            {/* Buttons End */}
          </Form>
        </div>
      </div>
    </>
  );
}

export default Login;
