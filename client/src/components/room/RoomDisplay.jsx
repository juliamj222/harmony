import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  CardText,
  Form,
  FormGroup,
  Input,
} from "reactstrap";
import React, { useState, useEffect } from "react";
import {
  API_CREATE_MESSAGE,
  API_DELETE_MESSAGE,
  API_MESSAGES_IN_ROOM,
} from "../../constants/endpoints";
import Messages from "./Messages";

function RoomDisplay(props) {
  const { name, description, addedUsers, _id } = props.room;
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(0);

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  function timerHandler() {
    setTimer(1);
  }
  setInterval(timerHandler, 300);

  async function getMessages() {
    try {
      let requestOptions = { method: "GET" };
      const response = await fetch(API_MESSAGES_IN_ROOM + _id, requestOptions);
      const data = await response.json();
      setMessages(data.messages);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDeleteMessage(id) {
    try {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", props.token);
      let requestOptions = {
        method: "DELETE",
        headers: myHeaders,
      };
      const response = await fetch(API_DELETE_MESSAGE + id, requestOptions);
      getMessages();
      toggle();
    } catch (error) {
      console.error(error);
    }
  }

  async function createMessage() {
    try {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", props.token);
      let body = {
        body: message,
      };
      let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body),
      };
      const response = await fetch(API_CREATE_MESSAGE + _id, requestOptions);
      getMessages();
      setMessage("");
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getMessages();
  }, [timer]);

  return (
    <>
      <Card className="m-2">
        <CardBody>
          <CardTitle tag="h5">{name}</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            {description}
          </CardSubtitle>
          {messages.map((message, index) => (
            <Messages
              key={index}
              message={message}
              currentId={props.currentId}
              isAdmin={props.isAdmin}
              handleDeleteMessage={handleDeleteMessage}
              getMessages={getMessages}
              token={props.token}
              toggle={toggle}
              modal={modal}
            />
          ))}
          <Form>
            <FormGroup>
              <Input
                id="message"
                name="message"
                placeholder="Enter your message"
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </FormGroup>
            <Button onClick={createMessage}>Send</Button>
          </Form>
        </CardBody>
      </Card>
    </>
  );
}

export default RoomDisplay;
