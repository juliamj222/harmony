import { Form, FormGroup, Input, Label } from "reactstrap";
import React, { useState } from 'react';
import {API_ROOM_CREATE} from "../../constants/endpoints";

function RoomCreate(props) {
const [name, setName] = useState("");
const [description, setDescription] = useState("");

  async function handleSubmit(evt) {
    evt.preventDefault()
    console.log("Create Room Clicked");
    //trycatch
    try {
        //headers
        const myHeaders=new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", props.token);
        //body
        const body={
            name: name,
            description: description,
        }
        //request options
        const requestOptions={
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(body),
        }
        
        //send request
        const response=await fetch (API_ROOM_CREATE, requestOptions)
        //get a response
        const data=await response.json();
        // refresh the room feed
        props.fetchRoomFeed();
        console.log(data);
    } catch (error) {
        console.error(error)
    }
  }
  return (
    <>
      <div className="d-flex neutral-background rounded p-5 flex-column" style={{background: "var(--secondary)"}}>
        <h2 className="font-primary text-center">Create a Room Post</h2>
        <Form >
          {/* Name, Description */}
          {/* Form Group Name */}
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Enter a name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormGroup>
          {/* Form Group Name End */}
          {/* Form Group Description */}
          <FormGroup>
            <Label for="description">Description</Label>
            <Input
              type="textarea"
              name="description"
              id="description"
              placeholder="Enter a description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormGroup>
          {/* Form Group Description End */}
          {/* Buttons */}
              <div style={{ display: "flex", justifyContent: "space-around" }}>
              <button className="button rounded" onClick={props.handleSwitchRooms}>Change to View Rooms</button>
              <button className="button rounded" title="Signup" onClick={handleSubmit}>Create Room</button>
              </div>
              {/* Buttons End */}
        </Form>
      </div>
    </>
  );
}

export default RoomCreate;
