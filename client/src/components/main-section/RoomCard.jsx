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
  ButtonGroup,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import {
  API_ROOM_DELETE_BY_ID,
  API_ROOM_UPDATE_BY_ID,
} from "../../constants/endpoints";
//imrs import usestate
import React, { useState } from "react";
import DeleteConfirmation from "../../ui/DeleteConfirmation";

function RoomCardF(props) {
  const { name, description, addedUsers, _id } = props.room;
  const navigate = useNavigate();
  //usf usestate
  const [editModeEnabled, setEditModeEnabled] = useState(false);
  const [nameInput, setNameInput] = useState(name);
  const [descriptionInput, setDescriptionInput] = useState(description);
  const [addedUsersInput, setAddedUsersInput] = useState("");
  const [removeSwitch, setRemoveSwitch] = useState(false);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

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
      toggle();
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
              backgroundColor: "var(--backgroundColor)",
              color: "var(--tritary)",
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
                    <Label
                      for="addedUsers"
                      style={{
                        width: "100%",
                        color: "var(--tritary)",
                      }}
                    >
                      Users to remove or add
                    </Label>
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
                    <Label
                      for="switch"
                      style={{ marginLeft: "3px", color: "var(--tritary)" }}
                    >
                      {" "}
                      Remove?
                    </Label>
                  </>
                ) : null}
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
              <ButtonGroup className="my-2 d-flex justify-content-center">
                <Button
                  onClick={handleView}
                  style={{ border: "1px solid black", borderRadius: "5px" }}
                >
                  View Room
                </Button>
                {props.currentId === props.room.userId ||
                props.isAdmin === "true" ? (
                  <div>
                    {/* delete button */}
                    <Button
                      color="danger"
                      style={{ border: "1px solid black" }}
                      onClick={toggle}
                    >
                      Delete
                    </Button>

                    {/* update button */}
                    <Button
                      color="danger"
                      style={{ border: "1px solid black" }}
                      onClick={handleToggleUpdate}
                    >
                      {editModeEnabled ? "Cancel" : "Update"}
                    </Button>
                    {/* save button, if editmode is enabled... && */}
                    {editModeEnabled && (
                      <Button
                        color="success"
                        style={{ border: "1px solid black" }}
                        onClick={handleUpdate}
                      >
                        Save
                      </Button>
                    )}
                  </div>
                ) : null}
              </ButtonGroup>
            </CardBody>
          </Card>
        </Form>
      ) : null}
      <DeleteConfirmation
        modal={modal}
        toggle={toggle}
        name={name}
        function={handleDelete}
      />
    </>
  );
}

export default RoomCardF;
