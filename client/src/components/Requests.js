import React, { useContext, useEffect, useState } from "react";
import RequestContext from "../contexts/request/RequestContext";
import { useNavigate } from "react-router-dom";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(false);
  const { showRequest } = useContext(RequestContext);
  const navigate = useNavigate();

  const handleClick = async (req_id, description) => {
    showRequest({ req_id, description });
    navigate("/requestdesc");
  };

  const getRequest = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_HOST}:5000/api/admin/request/fetchall`,
      {
        method: "GET",
      }
    );
    const json = await response.json();
    console.log(json);
    if (json.error) {
      setError(json.error);
    } else {
      setRequests(json.requests);
      console.log(requests);
    }
  };

  useEffect(() => {
    getRequest();
  }, []);

  return (
    <>
      {error == false && requests.length > 0 ? (
        <section className="admin">
          <table border={3}>
            <thead>
              <tr>
                <td colSpan={4}>Pending Requests</td>
              </tr>
              <tr>
                <th>Sr. No.</th>
                <th>Username</th>
                <th>Title</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request, index) => {
                const { username, title, description, req_id } = request;
                return (
                  <tr
                    onClick={() => {
                      handleClick(req_id, description);
                    }}
                    style={{ cursor: "pointer" }}
                    key={index}
                  >
                    <td>{index + 1}.</td>
                    <td>{username}</td>
                    <td>{title}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      ) : (
        <section className="admin">
          <h1>
            {" "}
            {requests.length == 0
              ? "No pending requests are there."
              : error}{" "}
          </h1>
        </section>
      )}
    </>
  );
};

export default Requests;
