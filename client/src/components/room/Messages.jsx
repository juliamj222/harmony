import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  Input,
} from "reactstrap";
import {
  API_GET_USER_BY_ID,
  API_UPDATE_MESSAGE,
} from "../../constants/endpoints";
import { useEffect, useState } from "react";
import DeleteConfirmation from "../../ui/DeleteConfirmation";

function Messages(props) {
  const [user, setUser] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [bodyInput, setBodyInput] = useState(props.message.body);

  function handleEdit() {
    setEditMode(!editMode);
  }

  async function handleUpdate() {
    try {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", props.token);
      let body = {
        body: bodyInput
      };
      let requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: JSON.stringify(body),
      };
      const response = await fetch(
        API_UPDATE_MESSAGE + props.message._id,
        requestOptions
      );
      const data = await response.json()
      console.log(data)
      handleEdit();
      props.getMessages();
    } catch (error) {
      console.error(error);
    }
  }

  async function getUserById(id) {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    const response = await fetch(API_GET_USER_BY_ID + id, requestOptions);
    const data = await response.json();
    return data;
  }

  useEffect(() => {
    getUserById(props.message.user).then((data) => setUser(data.user));
  }, []);

  return (
    <>
      <Card
        className="mb-1 mt-1"
        style={{
          width: "100%",
        }}
      >
        <CardBody>
          <CardTitle tag="h5">
            {user.firstName} {user.lastName}
          </CardTitle>
          {editMode ? (
            <Input
              id="body"
              placeholder="Enter Message"
              value={bodyInput}
              onChange={(e) => setBodyInput(e.target.value)}
            />
          ) : (
            <CardText tag="h4">{props.message.body}</CardText>
          )}
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            {props.message.when}
          </CardSubtitle>
          {props.currentId === props.message.user ||
          props.isAdmin === "true" ? (
            <div className="d-flex">
              <button className="button rounded" onClick={handleEdit}>
                Update
              </button>
              <button
                className="button rounded"
                onClick={props.toggle}
              >
                Delete
              </button>
            </div>
          ) : null}
          {editMode && props.currentId === props.message.user ? (
            <button className="button rounded" onClick={handleUpdate}>
              Save
            </button>
          ) : null}
        </CardBody>
      </Card>
      <DeleteConfirmation modal={props.modal} toggle={props.toggle} name={"your message"} id={props.message._id} function={props.handleDeleteMessage} />
    </>
  );
}

export default Messages;
