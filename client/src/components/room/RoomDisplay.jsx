import { Button, Card, CardBody, CardSubtitle, CardTitle, CardText, Form, FormGroup, Input } from "reactstrap";
import React, { useState, useEffect} from 'react';
import { API_MESSAGES_IN_ROOM } from "../../constants/endpoints";
import Messages from "./Messages";

function RoomDisplay(props) {
    const {name, description, addedUsers, _id}=props.room;
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

async function getMessages() {
   
    try {
        let requestOptions={method: "GET"}
        const response= await fetch (API_MESSAGES_IN_ROOM+_id, requestOptions)
        const data=await response.json();
        console.log (data)
        setMessages(data.messages)
    } catch (error) {
        
    }
}
useEffect(() => {
    getMessages()
}, [messages]);
    return (
    <>
    <Card
    className="mb-3 mt-3"
  style={{
    width: '100%'
  }}
>

  <CardBody>
    <CardTitle tag="h5">
      {name}
    </CardTitle>
    <CardSubtitle
      className="mb-2 text-muted"
      tag="h6"
    >
    {description}
    </CardSubtitle>
    {messages.map((message, index)=>(<Messages key={index}/>))}
    <Form>
        <FormGroup>
        <Input id="message" name="message" placeholder="Enter your message" type="text" value={message} onChange={(e)=>setMessage(e.target.value)} />   
        </FormGroup>    
        <Button >Submit</Button>  
    </Form>

  </CardBody>
</Card>
    </>
  );
}


export default RoomDisplay;
