import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, FormGroup, Input, Label } from "reactstrap";
import { API_UPDATE_USER } from "../../constants/endpoints";

function UpdateUser(props) {
  const params = useParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");


  async function handleUpdate(evt) {
    try {
      evt.preventDefault();
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", props.token);

      let body = {};
      if (email !== "") {
        body.email = email;
      }
      if (password !== "") {
        body.password = password;
      }
      if (firstName !== "") {
        body.firstName = firstName;
      }
      if (lastName !== "") {
        body.lastName = lastName;
      }

      console.log(body);

      let requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: JSON.stringify(body),
      };

      const response = await fetch(API_UPDATE_USER + params.id, requestOptions);
      navigate("/view-users");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="d-flex justify-content-center mt-5 h-auto">
        <div
          className="secondary-background p-5 rounded"
          style={{
            width: "450px",
            backgroundColor: "var(--secondary)",
            color: "var(--tritary)",
          }}
        >
          <h2 className="text-center">Update</h2>
          <Form>
            {/* Form group Email */}
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="Enter to Change your Email"
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
                placeholder="Enter to Change your First Name"
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
                placeholder="Enter to Change your Last Name"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </FormGroup>
            {/* Form Group LastName End */}
            {/* Buttons */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                className="button rounded"
                title="Update"
                onClick={handleUpdate}
              >
                Update
              </button>
              {/* Buttons End */}
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default UpdateUser;
