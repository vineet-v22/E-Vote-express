import React, { useContext, useEffect, useState } from "react";
import "../css/admin.css";
import AlertContext from "../contexts/alert/AlertContext";
const Registrations = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);
  const { successful, unSuccessful } = useContext(AlertContext);

  const fetchUsers = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_HOST}:5000/api/admin/fetchpendinguser`,
      {
        method: "GET",
      }
    );
    const json = await response.json();
    console.log(json);
    if (!json.error) {
      setUsers(json);
    } else {
      setError(json.error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleClick = async (username, resp) => {
    const ver = { username, resp };
    console.log(ver);
    const response = await fetch(
      `http://${process.env.REACT_APP_HOST}:5000/api/admin/fetchpendinguser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ver),
      }
    );
    const json = await response.json();
    if (json.error) {
      unSuccessful(json.error);
    } else {
      if (resp == 1) {
        successful("Registration request has been approved.");
      } else {
        unSuccessful("Registration request has been rejected");
      }
    }
    const newUsers = users;
    newUsers.filter((user) => {
      return user.username != username;
    });
    setUsers(newUsers);
  };

  return (
    <>
      {error == false ? (
        <section className="admin">
          <table border={3}>
            <thead>
              <tr>
                <th colSpan={8}>
                  <h1>Pending Registrations</h1>
                </th>
              </tr>
              <tr>
                <th>Sr. No.</th>
                <th>Username</th>
                <th>Name</th>
                <th>Email</th>
                <th>City</th>
                <th>Pin Code</th>
                <th>Approve</th>
                <th>Reject</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
                const {
                  username,
                  first_name,
                  last_name,
                  email,
                  pin_code,
                  city,
                } = user;
                return (
                  <tr key={username}>
                    <td>{index + 1}.</td>
                    <td>{username}</td>
                    <td>
                      {first_name} {last_name}
                    </td>
                    <td>{email}</td>
                    <td>{city}</td>
                    <td>{pin_code}</td>
                    <td>
                      <button onClick={() => handleClick(username, 1)}>
                        Approve
                      </button>
                    </td>
                    <td>
                      <button onClick={() => handleClick(username, 0)}>
                        Reject
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      ) : (
        <section className="admin">
          <h1>{error}</h1>
        </section>
      )}
    </>
  );
};

export default Registrations;
