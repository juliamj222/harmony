import React, { useState } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import { API_USER_SIGNUP } from "../../constants/endpoints";

function Signup(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("password123");
  const [firstName, setFirstName] = useState("Place");
  const [lastName, setLastName] = useState("Holder");

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
        firstname: firstName,
        lastname: lastName,
        isAdmin: false,
      };
      // * Request Options
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body),
      };
      // * Send Request
      const response = await fetch(API_USER_SIGNUP, requestOptions);

      // * Get a Response
      const data = await response.json();
      console.log(data);
      if (data.token) {
        props.updateToken(data.token);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="d-flex justify-content-center mt-5 h-auto">
        <div
          className="secondary-background p-5 rounded"
          style={{ width: "450px", backgroundColor: "var(--secondary)", color: "var(--tritary)" }}
        >
          <h2 className="text-center">SIGNUP FORM</h2>
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
            {/* Form Group FirstName */}
            <FormGroup>
              <Label for="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                placeholder="Enter your First Name"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </FormGroup>
            {/* Form Group FirstName End */}
            {/* Form Group LastName */}
            <FormGroup>
              <Label for="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                placeholder="Enter your Last Name"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </FormGroup>
            {/* Form Group LastName End */}
            {/* Buttons */}
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <button className="button rounded" onClick={props.handleSwitch}>Change to Login</button>
              <button className="button rounded" title="Signup" onClick={handleSubmit}>
                Signup
              </button>
              {/* Buttons End */}
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Signup;
