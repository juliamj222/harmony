//rsfc

import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  CardText,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { API_ROOM_DELETE_BY_ID } from "../../constants/endpoints";

function RoomCardF(props) {
  const { name, description, addedUsers, _id } = props.room;
  const navigate = useNavigate();

  function handleView() {
    // Copy to clipboard
    navigate("/feed/" + _id);
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
        <Card
          className="mb-3 mt-3"
          style={{
            width: "100%",
          }}
        >
          <CardBody>
            <CardTitle tag="h5">{name}</CardTitle>
            <CardSubtitle className="mb-2 text-muted" tag="h6">
              {props.room?.addedUsers?.firstName}
            </CardSubtitle>
            <CardText>{description}</CardText>
            <Button onClick={handleView}>View Room</Button>
            {props.currentId === props.room.userId ||
            props.isAdmin === "true" ? (
              <div>
                <Button color="danger" onClick={handleDelete}>
                  Delete
                </Button>
                <Button
                  color="danger"
                  onClick={() => {
                    navigate("/update-room/" + props.room._id);
                  }}
                >
                  Update
                </Button>
              </div>
            ) : null}
          </CardBody>
        </Card>
      ) : null}
    </>
  );
}

export default RoomCardF;
