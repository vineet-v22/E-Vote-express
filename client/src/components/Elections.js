import React, { useNavigate } from "react-router-dom";
import "../css/elections.css";
import Election from "./Election";
import photo from "./vv-removebg-preview.png";
import { useContext, useEffect, useState } from "react";
import AlertContext from "../contexts/alert/AlertContext";

const Elections = () => {
  const { unSuccessful } = useContext(AlertContext);
  const [elections, setElections] = useState([]);
  const getElections = async () => {
    if (!sessionStorage.getItem("token")) navigate("../login");

    const response = await fetch(
      `http://${process.env.REACT_APP_HOST}:5000/api/election/getall`,
      {
        method: "GET",
        headers: {
          "auth-token": sessionStorage.getItem("token"),
        },
      }
    );
    const json = await response.json();
    console.log(json);
    setElections(json.elections);
  };

  useEffect(() => {
    getElections();
  }, []);

  const navigate = useNavigate();

  const handleClick = (num) => {
    if (num === -1) {
      navigate("/past");
    } else if (num === 0) {
      navigate("/ongoing");
    } else {
      navigate("/upcoming");
    }
  };

  let ongoingElections = [],
    pastElections = [],
    upcomingElections = [];

  // const today = new Date('01-01-2024');
  const today = new Date();
  for (let index = 0; index < elections.length; index++) {
    const element = elections[index];
    const { edate, start_time, end_time } = element;
    const sDate = new Date(`${edate} ${start_time}`);
    // const sDate = new Date(`${edate} 00:00:00`);
    const eDate = new Date(`${edate} ${end_time}`);

    if (today >= sDate && today <= eDate) {
      ongoingElections.push(element);
    } else if (sDate < today) {
      pastElections.push(element);
    } else {
      upcomingElections.push(element);
    }
  }

  const createElection = () => {
    navigate("/newelection");
  };

  const Format = () => {
    return (
      <div className="election-format">
        <div className="eid">Sr. No.</div>
        <div className="eid">Election ID</div>
        <div className="ename">Election Name</div>
        <div className="edate">Date</div>
      </div>
    );
  };

  return (
    <>
      {sessionStorage.getItem("uname") === "Admin" && (
        <button className="create-election" onClick={createElection}>
          Create a new Election
        </button>
      )}
      <section>
        <div className="elections-box">
          <div className="ongoing elections">
            <h2>Ongoing Elections</h2>
            <Format />
            {ongoingElections.map((election, index) => {
              return (
                <Election
                  key={election.election_id}
                  election={election}
                  handleClick={handleClick}
                  stat={0}
                  serial={index + 1}
                />
              );
            })}
          </div>
          <div className="upcoming elections">
            <h2>Upcoming Elections</h2>
            <Format />
            {upcomingElections.map((election, index) => {
              return (
                <Election
                  key={election.election_id}
                  election={election}
                  handleClick={handleClick}
                  stat={1}
                  serial={index + 1}
                />
              );
            })}
          </div>
          <div className="past elections">
            <h2>Past Elections</h2>
            <Format />
            {pastElections.map((election, index) => {
              return (
                <Election
                  key={election.election_id}
                  election={election}
                  handleClick={handleClick}
                  stat={-1}
                  serial={index + 1}
                />
              );
            })}
          </div>
        </div>
        <div className="image-box">
          <img src={photo} alt="Vote Now" />
        </div>
      </section>
    </>
  );
};

export default Elections;
