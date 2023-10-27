import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from "reactstrap";
/* import RoomCreate from "./RoomCreate"; */
import RoomFeed from "./RoomFeed";
import { API_ROOM_VIEW_ALL } from "../../constants/endpoints";
import RoomCreate from "./RoomCreate";


const MainIndex = (props) => {
    const [roomFeedItems, setRoomFeedItems] = useState([]);
    async function fetchRoomFeed(){
        try {
            //Headers
            const myHeaders= new Headers();
            myHeaders.append("Authorization", props.token)
            //Request Options
            let requestOptions={
                method:"GET",
                headers: myHeaders,
            }
  //Send Request  (open a file quickly ctrl,p  file name)

  const response=await fetch(API_ROOM_VIEW_ALL, requestOptions);
  const data=await response.json();
  console.log (data);
  //Get a response
  //Set state
  setRoomFeedItems(data.rooms.reverse());
} catch (error) {
  console.error(error)
}
}

//uef
useEffect(() => {
    //check to see if we have a token
    if (props.token==="") {
        return
    }
    // exit clause
fetchRoomFeed();
}, [props.token]);
console.log(props.token)
    return ( 
        <>
    <Container className="mt-5">
        <Row>
            <Col md="4"><RoomCreate token={props.token} fetchRoomFeed={fetchRoomFeed}/></Col> 
            <Col md="8">
                <RoomFeed roomFeedItems={roomFeedItems}/>
            </Col>

        </Row>
        </Container>
        </> 
        );
}

export default MainIndex;