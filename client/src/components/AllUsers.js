import React, { useEffect, useState } from "react";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);
  const getAllUser = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_HOST}:5000/api/admin/fetchalluser`,
      {
        method: "GET",
      }
    );
    const json = await response.json();
    if (!json.error) {
      setUsers(json);
    } else {
      setError(json.error);
    }
  };

  useEffect(() => {
    getAllUser();
  }, []);
  return (
    <>
      {error == false ? (
        <section className="admin">
          <table border={3}>
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Username</th>
                <th>Name</th>
                <th>Email</th>
                <th>City</th>
                <th>Pin Code</th>
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

export default AllUsers;
