//rsfc

import { Button, Card, CardBody, CardSubtitle, CardTitle, CardText } from "reactstrap";

function RoomCardF(props) {
    const {name, description, addedUsers}=props.room;
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
{addedUsers?.firstName}
    </CardSubtitle>
    <CardText>{description}</CardText>
    <Button>
      Button
    </Button>
  </CardBody>
</Card>
    </>
  );
}


export default RoomCardF;
