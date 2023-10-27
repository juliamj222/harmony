//rsfc
import RoomCardF from "./RoomCard";

function RoomFeed(props) {
    return (
      <>

  {/*mapping*/}    
{props.roomFeedItems.map((room, index)=> (<RoomCardF key={index} room={room}/>
      ))} 
      </>
    );
  }
  
  
  export default RoomFeed;