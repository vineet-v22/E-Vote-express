import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();
  const [elections, setElections] = useState([]);

  const getResults = async () => {
    if (!sessionStorage.getItem("token")) navigate("../login");
    console.log(sessionStorage.getItem("token"));
    const response = await fetch(
      `http://${process.env.REACT_APP_HOST}:5000/api/election/result`,
      {
        method: "GET",
      }
    );
    const json = await response.json();
    let newElection = [];
    for (let i = 0; i < json.elections.length; i++) {
      const element = json.elections[i];
      if (new Date(element.edate) >= new Date()) {
        continue;
      }
      let election = {};
      election.id = element.election_id;
      election.name = element.election_name;
      let candidate = "No Winner",
        vote = 0;
      for (let j = 0; j < element.candidates.length; j++) {
        const elem = element.candidates[j];
        if (elem.vote_count > vote) {
          vote = elem.vote_count;
          candidate = elem.name;
        }
      }
      element.winner = candidate;
      election.winner = candidate;
      newElection.push(election);
    }
    setElections(newElection);
    console.log(elections);
  };

  useEffect(() => {
    getResults();
  },[]);

  if (!sessionStorage.getItem("token")) navigate("../login");
  return elections.length > 0 ? (
    <div className="results">
      <table border={4} cellSpacing={0}>
        <tbody>
          <tr>
            <th colSpan={3}>
              <h1
                onClick={() => {
                  console.log(elections);
                }}
              >
                Results
              </h1>
            </th>
          </tr>
          <tr>
            <th>Election ID</th>
            <th>Election Name</th>
            <th>Winner</th>
          </tr>
          {elections.map((election, index) => {
            const { id, name, winner } = election;
            return (
              <tr key={index}>
                <td>{id}</td>
                <td>{name}</td>
                <td>{winner}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  ) : (
    <section className="admin">
      <h1>No past elections are there.</h1>
    </section>
  );
};

export default AboutUs;
