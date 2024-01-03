import React, { useContext, useEffect, useState } from "react";
import ElectionContext from "../contexts/election/ElectionContext";

const PastElection = () => {
  const { curElection } = useContext(ElectionContext);
  const { election_name,election_id } = curElection;
  const [results, setResults] = useState([]);
  // const election_id = 123456;
  const getResults = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_HOST}:5000/api/election/result`,
      {
        method: "GET",
      }
    );
    const json = await response.json();
    let candidates = [];
    for (let i = 0; i < json.elections.length; i++) {
      const element = json.elections[i];
      if (element.election_id === election_id) {
        candidates = element.candidates;
        break;
      }
    }
    let n = candidates.length;
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        if (candidates[i].vote_count < candidates[j].vote_count) {
          const temp = candidates[i];
          candidates[i] = candidates[j];
          candidates[j] = temp;
        }
      }
    }
    setResults(candidates);
  };

  useEffect(() => {
    getResults();
  },[]);


  return (
    <>
      <div className="past-election">
        <h1>Election Name: {election_name}</h1>
        <h2>Election ID: {election_id}</h2>
        <table border={4} cellSpacing={0}>
          <tbody>
            <tr>
              <th>Rank</th>
              <th>Candidate Name</th>
              <th>No. of Votes</th>
            </tr>
            {results.map((candidate, index) => {
              const { name, vote_count } = candidate;
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{name}</td>
                  <td>{vote_count}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PastElection;
