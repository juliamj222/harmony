//rsfc
import RoomCardF from "./RoomCard";

function RoomFeed(props) {
    return (
      <>
<div className="rounded p-2" style={{background: "var(--secondary)"}}>
  {/*mapping*/}    
{props.roomFeedItems.map((room, index)=> (<RoomCardF key={index} room={room}/>
      ))} 
      </div>
      </>
    );
  }
  
  
  export default RoomFeed;