import React, { useContext, useEffect, useState } from "react";
import ElectionContext from "../contexts/election/ElectionContext";

const UpcomingElection = () => {
  const { curElection } = useContext(ElectionContext);
  const { election_id, election_name } = curElection;
  const [candidates, setCandidates] = useState([]);
  const [error, setError] = useState(false);
  const getCandidates = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_HOST}:5000/api/election/getallcandidates/${election_id}`,
      {
        method: "GET",
        headers: { "auth-token": sessionStorage.getItem("token") },
      }
    );
    const json = await response.json();
    console.log(json);
    if (json.error) {
      setError(json.error);
    } else {
      setCandidates(json.candidates);
    }
  };

  useEffect(() => {
    getCandidates();
  }, []);

  return (
    <>
      <div className="results">
        <h1>The election has not yet commenced.</h1>
        <table border={4} cellSpacing={0}>
          <thead>
            <tr>
              <th colSpan={2}>{election_name}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Sr. No.</td>
              <td>Candidate Name</td>{" "}
            </tr>
            {candidates.map((candidate, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{candidate.name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UpcomingElection;
