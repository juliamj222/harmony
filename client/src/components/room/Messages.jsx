import {
  Alert,
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  Collapse,
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

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  function handleEdit() {
    setEditMode(!editMode);
  }

  async function handleUpdate() {
    try {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", props.token);
      let body = {
        body: bodyInput,
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
      const data = await response.json();
      console.log(data);
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
          display: "flex",
          flexDirection: "row", background: "var(--backgroundColor)", border: "0px", borderRadius: "5px"
        }}
      >
        <CardBody style={{ background: "var(--backgroundColor)", border: "0px", borderRadius: "5px", maxWidth: "80%"}}>
          <CardTitle tag="h5" style={{color: "var(--tritary)"}}>
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
            <CardText tag="h4" style={{color: "var(--tritary)"}}>{props.message.body}</CardText>
          )}
        <CardSubtitle style={{color: "var(--tritary)"}} className="mb-2" tag="h6">
            {props.message.when}
          </CardSubtitle>
        </CardBody>
          {props.currentId === props.message.user ||
          props.isAdmin === "true" ? (
            <div style={{ display: "flex", flexDirection: "column", justifyContent:"flex-start", width: "20%"}}>
              <Button
                onClick={toggle}
                style={{
                  fontSize: "42px",
                  color: "var(--tritary)",
                  background: "var(--backgroundColor)",
                  border: "none",
                  padding: "0px",
                  alignSelf: "end",
                  marginRight: "1em"
                }}
              >
                ...
              </Button>
              <Collapse isOpen={isOpen}>
                <div className="d-flex" >
                  <button style={{margin: "3px", marginBottom:"6px"}} className="button rounded" onClick={handleEdit}>
                    {editMode ? "Cancel" : "Update"}
                  </button>
                  <button style={{margin: "3px", marginBottom:"6px"}} className="button rounded" onClick={props.toggle}>
                    Delete
                  </button>
                </div>
              </Collapse>
            </div>
          ) : null}
          {editMode && props.currentId === props.message.user ? (
            <button className="button rounded" onClick={handleUpdate}>
              Save
            </button>
          ) : null}
      </Card>
      <DeleteConfirmation
        modal={props.modal}
        toggle={props.toggle}
        name={"your message"}
        id={props.message._id}
        function={props.handleDeleteMessage}
      />
    </>
  );
}

export default Messages;
