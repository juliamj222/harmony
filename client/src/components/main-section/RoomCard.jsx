//rsfc

import { Button, Card, CardBody, CardSubtitle, CardTitle, CardText } from "reactstrap";
import {useNavigate} from "react-router-dom"

function RoomCardF(props) {
    const {name, description, addedUsers, _id}=props.room;
    const navigate=useNavigate()

    function handleView() {
      // Copy to clipboard
      navigate("/feed/"+_id);
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
{addedUsers?.firstName}
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
