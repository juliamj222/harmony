//rsfc

import { Button, Card, CardBody, CardSubtitle, CardTitle, CardText } from "reactstrap";

function RoomCardF(props) {
    const {name, description, addedUsers, _id}=props.room;

    function handleView() {
      // Copy to clipboard
      navigator.clipboard.writeText("http://localhost:3000/feed/"+_id);
      console.log("Click")
    }

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
{props.room?.addedUsers?.firstName}
    </CardSubtitle>
    <CardText>{description}</CardText>
    <Button onClick={handleView}>
      View Room
    </Button>
  </CardBody>
</Card>
    </>
  );
}


export default RoomCardF;
