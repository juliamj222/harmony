//rsfc
import RoomCardF from "./RoomCard";

function RoomFeed(props) {
    return (
      <>
    <div style={{background: "var(--secondary)"}} className="rounded p-2 m-2">
  {/*mapping*/}    
{props.roomFeedItems.map((room, index)=> (<RoomCardF key={index} room={room} isAdmin={props.isAdmin} currentId={props.currentId} fetchRoomFeed={props.fetchRoomFeed} token={props.token} />
      ))} 
      
          {/* Buttons */}
          <div style={{ display: "flex", justifyContent: "space-around" }}>
              <button className="button rounded" onClick={props.handleSwitchRooms}>Create a room</button>

              </div>
              {/* Buttons End */}


    </div>
      </>
    );
  }
  
  
  export default RoomFeed;