import React, { useContext } from "react";
import ElectionContext from "../contexts/election/ElectionContext";

const Election = ({ election, handleClick, stat, serial }) => {
  const { changeElection } = useContext(ElectionContext);

  let { election_id, election_name, edate } = election;
  edate = new Date(edate).toDateString();

  return (
    <div
      className="election"
      onClick={() => {
        changeElection(election);
        if (sessionStorage.getItem("username") == "admin") handleClick(-1);
        else handleClick(stat);
      }}
    >
      <div className="eid">{serial} .</div>
      <div className="eid">{election_id}</div>
      <div className="ename">{election_name}</div>
      <div className="edate">{edate}</div>
    </div>
  );
};

export default Election;
