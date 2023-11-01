//rsfc
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  CardText,
  Label,
  Input,
  Form,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import {
  API_ROOM_DELETE_BY_ID,
  API_ROOM_UPDATE_BY_ID,
} from "../../constants/endpoints";
//imrs import usestate
import React, { useState } from "react";

function RoomCardF(props) {
  const { name, description, addedUsers, _id } = props.room;
  const navigate = useNavigate();
  //usf usestate
  const [editModeEnabled, setEditModeEnabled] = useState(false);
  const [nameInput, setNameInput] = useState(name);
  const [descriptionInput, setDescriptionInput] = useState(description);
  const [addedUsersInput, setAddedUsersInput] = useState("");
  const [removeSwitch, setRemoveSwitch] = useState(false);

  function handleView() {
    // Copy to clipboard
    navigate("/feed/" + _id);
  }

  // this function just toggles to the opposite, sets true to false etc
  function handleToggleUpdate() {
    console.log("Edit Toggle Works");
    setEditModeEnabled(!editModeEnabled);
  }

  async function handleUpdate() {
    // Headers
    let myHeaders = new Headers();
    myHeaders.append("Authorization", props.token);
    myHeaders.append("Content-Type", "application/json");
    // Body
    const body = {
      name: nameInput,
      description: descriptionInput,
      addedUsers: addedUsersInput,
      removeAddedUsers: removeSwitch,
    };
    // Request options
    const requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: JSON.stringify(body),
    };
    // Send request
    const response = await fetch(
      API_ROOM_UPDATE_BY_ID + "/" + _id,
      requestOptions
    );
    // Get a response
    const data = await response.json();
    console.log(data);
    // refresh the feed
    props.fetchRoomFeed();
    // change the edit mode to false
    setEditModeEnabled(false);
    setRemoveSwitch(false);
  }

  async function handleDelete() {
    try {
      // Headers
      const myHeaders = new Headers();
      myHeaders.append("Authorization", props.token);
      // Request Options
      let requestOptions = {
        method: "DELETE",
        headers: myHeaders,
      };
      // Send Request
      const response = await fetch(API_ROOM_DELETE_BY_ID + _id, requestOptions);
      //  Get A Response
      const data = await response.json();
      console.log(data);
      // Refresh the feed
      props.fetchRoomFeed();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {props.room.addedUsers.includes(props.currentId) ||
      props.isAdmin === "true" ? (
        <Form>
          <Card
            className="mb-3 mt-3"
            style={{
              width: "100%",
            }}
          >
            <CardBody>
              {editModeEnabled ? (
                <>
                  <Label for="name">Room Name</Label>
                  <Input
                    id="name"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="mb-2"
                  />
                </>
              ) : (
                <CardTitle tag="h5">{name}</CardTitle>
              )}
              {/* for each one of these, a usestate */}
              <CardSubtitle className="mb-2 text-muted" tag="h6">
                {props.room?.addedUsers?.firstName}
                {editModeEnabled ? (
                  <>
                    <Label for="addedUsers">Users to remove or add</Label>
                    <Input
                      id="addedUsers"
                      value={addedUsersInput}
                      onChange={(e) => setAddedUsersInput(e.target.value)}
                      className="mb-2"
                      placeholder="Enter user ID"
                    />
                    <Input
                      type="switch"
                      onClick={() => {
                        setRemoveSwitch(!removeSwitch);
                      }}
                    />
                    <Label for="switch" style={{ marginLeft: "3px" }}>
                      {" "}
                      Remove?
                    </Label>
                  </>
                ) : (
                  <CardSubtitle tag="h5">{addedUsers}</CardSubtitle>
                )}
              </CardSubtitle>
              {editModeEnabled ? (
                <>
                  <Label for="description">Description</Label>
                  <Input
                    id="description"
                    value={descriptionInput}
                    onChange={(e) => setDescriptionInput(e.target.value)}
                    className="mb-2"
                    type="textarea"
                  />
                </>
              ) : (
                <CardText>{description}</CardText>
              )}
              <Button onClick={handleView}>View Room</Button>
              {props.currentId === props.room.userId ||
              props.isAdmin === "true" ? (
                <div>
                  {/* delete button */}
                  <Button color="danger" onClick={handleDelete}>
                    Delete
                  </Button>
                  {/* update button */}
                  <Button color="danger" onClick={handleToggleUpdate}>
                    {editModeEnabled ? "Cancel" : "Update"}
                  </Button>
                  {/* save button, if editmode is enabled... && */}
                  {editModeEnabled && (
                    <Button color="success" onClick={handleUpdate}>
                      Save
                    </Button>
                  )}
                </div>
              ) : null}
            </CardBody>
          </Card>
        </Form>
      ) : null}
    </>
  );
}

export default RoomCardF;
