import React, { useState } from "react";
import RequestContext from "./RequestContext";

const RequestState = (props) => {
  const [request, setRequest] = useState({});

  const showRequest = async (req) => {
    console.log("req", req);
    setRequest(req);
  };
  return (
    <RequestContext.Provider value={{ showRequest, request }}>
      {props.children}
    </RequestContext.Provider>
  );
};

export default RequestState;
