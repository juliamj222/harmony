import { useEffect, useState } from "react";
import { API_DELETE_USER, API_GET_ALL_USERS } from "../../constants/endpoints";
import { useNavigate } from "react-router-dom";
import DeleteConfirmation from "../../ui/DeleteConfirmation";

function ViewUsers(props) {
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  async function getUserList() {
    try {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      let requestOptions = {
        method: "GET",
        headers: myHeaders,
      };
      const response = await fetch(API_GET_ALL_USERS, requestOptions);
      const data = await response.json();
      setUserList(data.users);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getUserList();
  }, []);


async function deleteUser(id) {
  try {
    let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", props.token);
      let requestOptions = {
        method: "DELETE",
        headers: myHeaders,
      };
      const response = await fetch(API_DELETE_USER + id, requestOptions);
      getUserList();
      toggle();
  } catch (error) {
    console.error(error)
  }
}

  return (
    <>
      {userList.map((user, index) => (
        <div key={index} className="d-flex text-center justify-content-center mt-3 h-auto">
          <div
            
            className="p-3 rounded d-flex justify-content-center"
            style={{
              width: "40%",
              backgroundColor: "var(--secondary)",
              color: "var(--tritary)",
              flexDirection: "column",
              flexWrap: "wrap",
            }}
          >
            <div>
              <h3>
                {user.firstName ? user.firstName : "N/A"}{" "}
                {user.lastName ? user.lastName : "N/A"}
              </h3>
              <p className="m-2">{user.email}</p>
              <p className="m-2">{user._id}</p>
            </div>
            {user._id === props.currentId || props.isAdmin === "true" ? (
              <div>
                <button className="button rounded" onClick={() => {navigate("/update-user/" + user._id)}}>
                  Update
                </button>
                <button className="button rounded m-2" onClick={toggle}>
                  Delete
                </button>
              </div>
            ) : null}
          </div>
           <DeleteConfirmation modal={modal} toggle={toggle} name={user.firstName} id={user._id} function={deleteUser} />
        </div>
      ))}
    </>
  );
}

export default ViewUsers;
