import React, { useState } from "react";
import ElectionContext from "./ElectionContext";

const ElectionState = (props) => {
  const [curElection, setCurElection] = useState({});
  const changeElection = (election) => {
    console.log("called",election);
     setCurElection(election);
     console.log('cc',curElection)
  };
  console.log(curElection)
  return (
    <ElectionContext.Provider value={{ changeElection, curElection }}>
      {props.children}
    </ElectionContext.Provider>
  );
};

export default ElectionState;
