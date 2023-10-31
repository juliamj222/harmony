import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
} from "reactstrap";
import { API_GET_USER_BY_ID } from "../../constants/endpoints";
import { useEffect, useState } from "react";

function Messages(props) {
  const [user, setUser] = useState("");

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
          <CardText tag="h4">{props.message.body}</CardText>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            {props.message.when}
          </CardSubtitle>
          { props.currentId === props.message.user || props.isAdmin === "true" ? <div className="d-flex">
            <button
              className="button rounded"
              style={{ justifySelf: "right" }}
              onClick={"handleUpdate"}
            >
              Update
            </button>
            <button
              className="button rounded"
              style={{ justifySelf: "right" }}
              onClick={() => {
                props.handleDeleteMessage(props.message._id)
              } }
            >
              Delete
            </button>
          </div> : null }
        </CardBody>
      </Card>
    </>
  );
}

export default Messages;
