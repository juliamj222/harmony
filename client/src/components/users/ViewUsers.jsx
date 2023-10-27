import { useEffect, useState } from "react";
import { API_GET_ALL_USERS } from "../../constants/endpoints";
import { Table } from "reactstrap";

function ViewUsers(props) {
  const [userList, setUserList] = useState([]);

  async function getUserList(evt) {
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
      console.log(userList);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getUserList();
  }, []);

  return (
    <>
      {userList.map((user, index) => (
        <div className="d-flex text-center justify-content-center mt-3 h-auto">
          <div
            className="p-3 rounded d-flex justify-content-center"
            style={{
              width: "40%",
              backgroundColor: "var(--secondary)",
              color: "var(--tritary)",
              flexDirection: "column",
              flexWrap: "wrap"
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
            <div>
                <button className="button rounded" onClick={""}>Update</button>
                <button className="button rounded m-2" onClick={""}>Delete</button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default ViewUsers;
