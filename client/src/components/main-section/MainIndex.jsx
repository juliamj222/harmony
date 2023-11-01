import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import RoomFeed from "./RoomFeed";
import { API_ROOM_VIEW_ALL } from "../../constants/endpoints";
import RoomCreate from "./RoomCreate";

const MainIndex = (props) => {
  const [roomFeedItems, setRoomFeedItems] = useState([]);
  const [userId, setUserId] = useState("");
  async function fetchRoomFeed() {
    try {
      //Headers
      const myHeaders = new Headers();
      myHeaders.append("Authorization", props.token);
      //Request Options
      let requestOptions = {
        method: "GET",
        headers: myHeaders,
      };
      //Send Request  (open a file quickly ctrl,p  file name)
      const response = await fetch(API_ROOM_VIEW_ALL, requestOptions);
      //Get a response
      const data = await response.json();
      console.log(data);
      //Set state
      setRoomFeedItems(data.rooms.reverse());
      setUserId(data.userId);
    } catch (error) {
      console.error(error);
      props.updateToken(null);
    }
  }

  //uef
  useEffect(() => {
    //check to see if we have a token
    if (props.token === "") {
      return;
    }
    // exit clause
    fetchRoomFeed();
  }, [props.token]);
  console.log(props.token);

  const [roomFeed, setRoomFeed] = useState(true);
  function handleSwitchRooms() {
    setRoomFeed(!roomFeed);
  }
  return (
    <>
      {roomFeed ? (
        <RoomCreate
          token={props.token}
          handleSwitchRooms={handleSwitchRooms}
          fetchRoomFeed={fetchRoomFeed}
        />
      ) : (
        <RoomFeed
          token={props.token}
          isAdmin={props.isAdmin}
          currentId={props.currentId}
          roomFeedItems={roomFeedItems}
          handleSwitchRooms={handleSwitchRooms}
          fetchRoomFeed={fetchRoomFeed}
        />
      )}
    </>
  );
};
export default MainIndex;
