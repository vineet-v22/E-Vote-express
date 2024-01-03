import React, { useContext, useEffect, useState } from "react";
import "../css/contact.css";
import { useNavigate } from "react-router-dom";
import AlertContext from "../contexts/alert/AlertContext";

const ContactUs = () => {
  const [request, setRequest] = useState({ title: "", description: "" });
  const { successful, unSuccessful } = useContext(AlertContext);

  const navigate = useNavigate();
  useEffect(() => {
    if (!sessionStorage.getItem("token")) navigate("../login");
  });

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setRequest({ ...request, [name]: value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    request.username = sessionStorage.getItem("username");
    console.log(request);

    const response = await fetch(
      `http://${process.env.REACT_APP_HOST}:5000/api/election/request`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      }
    );
    const json = await response.json();
    successful("Your request has been submitted successfully!");
    setRequest({ title: "", description: "" });
  };

  return (
    <div className="contact">
      <h1>Create a new Request</h1>
      <div className="request-form">
        <form onSubmit={handleOnSubmit}>
          <div className="input-request">
            <label htmlFor="title">Title</label>
            <textarea
              cols={70}
              rows={5}
              name="title"
              id="title"
              onChange={handleOnChange}
              maxLength={60}
              value={request.title}
            />
          </div>
          <div className="input-request">
            <label htmlFor="title">Description</label>
            <textarea
              cols={70}
              rows={10}
              name="description"
              id="description"
              onChange={handleOnChange}
              value={request.description}
            />
          </div>
          <div className="submit-reset">
            <button type="reset">Reset</button>
            <button type="submit">Submit</button>
          </div>
          <h2>You will be contacted by admin through your email.</h2>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
