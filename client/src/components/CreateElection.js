import React, { useContext, useState } from "react";
import "../css/createelection.css";
import AlertContext from "../contexts/alert/AlertContext";
const CreateElection = () => {
  const [candidates, setCandidates] = useState([]);
  const [candidate, setCandidate] = useState("");
  const preElection = {
    election_id: "",
    election_name: "",
    edate: new Date().toISOString().slice(0, 10),
    start_time: "08:00",
    end_time: "16:00",
  };
  const [election, setElection] = useState(preElection);
  const { unSuccessful, successful } = useContext(AlertContext);
  const addCandidate = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `http://${process.env.REACT_APP_HOST}:5000/api/auth/getuser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: candidate }),
      }
    );

    const json = await response.json();
    if (json.error) {
      unSuccessful("Please ener a valid username.");
    } else {
      const { username } = json.user;
      for (let i = 0; i < candidates.length; i++) {
        const element = candidates[i];
        if (element === username) {
          unSuccessful("Candidate has been already added.");
          return;
        }
      }
      let newCandidates = candidates;
      newCandidates.push(username);
      setCandidates(newCandidates);
      setCandidate("");
    }
  };

  const handleOnChange = async (e) => {
    setCandidate(e.target.value);
  };

  const createElection = async (e) => {
    e.preventDefault();

    let newElection = election;
    const today = new Date();
    const electionDate = new Date(`${election.edate} ${election.start_time}`);
    if (electionDate < today) {
      unSuccessful("Please enter valid date and time.");
      return;
    }
    newElection.candidates = candidates;
    const response = await fetch(
      `http://${process.env.REACT_APP_HOST}:5000/api/election/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": sessionStorage.getItem("token"),
        },
        body: JSON.stringify(newElection),
      }
    );
    const json = await response.json();
    if (json.error) {
      unSuccessful(json.error);
    } else {
      successful("Election has been created successfully.");
      setCandidates([]);
      setElection(preElection);
    }
  };

  const changeElectionCred = async (event) => {
    const { name, value } = event.target;
    setElection({ ...election, [name]: value });
  };

  const removeCandidate = async (delCandidate) => {
    const newCandidates = candidates.filter((candidate) => {
      console.log(candidate, delCandidate);
      return candidate != delCandidate;
    });
    setCandidates(newCandidates);
    console.log(newCandidates);
    console.log(candidates);
  };

  return (
    <>
      <section className="create-election">
        <div className="add-candidates">
          <form action="">
            <h1>Create a New Election.</h1>
            <div className="ename">
              <label htmlFor="ename">Election ID: </label>
              <input
                type="number"
                name="election_id"
                id="election_id"
                required
                value={election.election_id}
                onChange={changeElectionCred}
              />
              <label htmlFor="ename">Election Name: </label>
              <input
                type="text"
                name="election_name"
                id="election_name"
                required
                onChange={changeElectionCred}
                value={election.election_name}
              />
              <label htmlFor="ename">Election Date: </label>
              <input
                type="date"
                name="edate"
                id="edate"
                value={election.edate}
                onChange={changeElectionCred}
              />
              <label htmlFor="start_time">Start Time: </label>
              <input
                type="time"
                name="start_time"
                id="start_time"
                value={election.start_time}
                onChange={changeElectionCred}
              />
              <label htmlFor="end_time">End Time: </label>
              <input
                type="time"
                name="end_time"
                id="end_time"
                value={election.end_time}
                onChange={changeElectionCred}
              />
            </div>
            <table border={10}>
              <thead>
                <tr>
                  <th>Sr. No.</th>
                  <th colSpan={2}>Candidate Username</th>
                </tr>
              </thead>
              <tbody>
                {candidates.map((candidate, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}.</td>
                      <td>{candidate}</td>
                      <td>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            removeCandidate(candidate);
                          }}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
                <tr>
                  <td>{candidates.length + 1}.</td>
                  <td colSpan={2}>
                    <input
                      type="text"
                      name="candiaate"
                      id="candiaate"
                      onChange={handleOnChange}
                      value={candidate}
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan={3}>
                    <button onClick={addCandidate}>Add Candidate</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <button onClick={createElection}>Submit</button>
          </form>
        </div>
      </section>
    </>
  );
};

export default CreateElection;
