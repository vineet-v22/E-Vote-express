import React, { useContext } from "react";
import RequestContext from "../contexts/request/RequestContext";
import { useNavigate } from "react-router-dom";
import AlertContext from "../contexts/alert/AlertContext";

const RequestDesc = () => {
  const { request } = useContext(RequestContext);
  const { successful, unsuccessful } = useContext(AlertContext);
  const { description, req_id } = request;
  const navigate = useNavigate();
  const handleClick = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_HOST}:5000/api/admin/request/delete`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ req_id: req_id }),
      }
    );
    const json = await response.json();
    if (json.error) {
      unsuccessful(json.error);
    } else {
      successful("Request has been deleted successfully!");

      setTimeout(() => {
        navigate("/requests");
      }, 3000);
    }
  };

  return (
    <>
      <section className="admin">
        {" "}
        <div className="container">
          <h1>Description</h1>

          <p>{description}</p>
        </div>
        <button onClick={handleClick} className="request">
          Request Resolved. Delete Now!
        </button>
      </section>
    </>
  );
};

export default RequestDesc;
