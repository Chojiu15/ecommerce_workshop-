import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const api = `http://localhost:3002`;

  const [user, setUser] = useState([]);
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios
      .get(`${api}/users`)
      .catch((err) => console.error(err))
      .then((res) => setUser(res.data));
  };

  const postUsers = (e) => {
    e.preventDefault();
    axios
      .post(`${api}/users`, userData)
      .catch((err) => console.error(err))
      .then(() => fetchUsers());
  };

  const deleteUser = (e, id) => {
    e.preventDefault();
    axios
      .delete(`${api}/users/${id}`)
      .catch((err) => console.error(err))
      .then(() => fetchUsers());
  };

  console.log(userData);
  return (
    <>
      {user.map((elem) => {
        return (
          <>
            <li>
              {elem.idtable1} {elem.firstname} {elem.lastname}{" "}
              <button onClick={(e) => deleteUser(e, elem.idtable1)}>X</button>
            </li>{" "}
          </>
        );
      })}
      <form onSubmit={(e) => postUsers(e)}>
        <input
          value={userData.firstname}
          onChange={(e) =>
            setUserData({ ...userData, firstname: e.target.value })
          }
        />
        <input
          value={userData.lastname}
          onChange={(e) =>
            setUserData({ ...userData, lastname: e.target.value })
          }
        />
        <input
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />
        <button type="submit">Add a user</button>
      </form>
    </>
  );
}

export default App;
