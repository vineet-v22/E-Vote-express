import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Results from "./components/Results";
import Elections from "./components/Elections";
import UpcomingElection from "./components/UpcomingElection";
import OngoingElection from "./components/OngoingElection";
import PastElection from "./components/PastElection";
import ElectionState from "./contexts/election/ElectionState";
import ContactUs from "./components/ContactUs";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import AlertState from "./contexts/alert/AlertState";
import AllUsers from "./components/AllUsers";
import Requests from "./components/Requests";
import Registrations from "./components/Registrations";
import RequestDesc from "./components/RequestDesc";
import RequestState from "./contexts/request/RequestState";
import CreateElection from "./components/CreateElection";
import Profile from "./components/Profile";
import UpdateProfile from "./components/UpdateProfile";
import UserState from "./contexts/user/UserState";

const App = () => {
  return (
    <>
      <ElectionState>
        <UserState>
          <AlertState>
            <RequestState>
              <Router>
                <Navbar />
                <Routes>
                  <Route exact path="/" element={<Home />}></Route>
                  <Route exact path="/results" element={<Results />}></Route>
                  <Route
                    exact
                    path="/elections"
                    element={<Elections />}
                  ></Route>
                  <Route
                    exact
                    path="/contactus"
                    element={<ContactUs />}
                  ></Route>
                  <Route
                    exact
                    path="/upcoming"
                    element={<UpcomingElection />}
                  ></Route>
                  <Route
                    exact
                    path="/ongoing"
                    element={<OngoingElection />}
                  ></Route>
                  <Route exact path="/past" element={<PastElection />}></Route>
                  <Route
                    exact
                    path="/registrations"
                    element={<Registrations />}
                  ></Route>
                  <Route exact path="/login" element={<Login />}></Route>
                  <Route exact path="/signup" element={<SignUp />}></Route>
                  <Route exact path="/requests" element={<Requests />}></Route>
                  <Route exact path="/allusers" element={<AllUsers />}></Route>
                  <Route exact path="/profile" element={<Profile />}></Route>
                  <Route
                    exact
                    path="/newelection"
                    element={<CreateElection />}
                  ></Route>
                  <Route
                    exact
                    path="/requestdesc"
                    element={<RequestDesc />}
                  ></Route>
                  <Route
                    exact
                    path="/updateprofile"
                    element={<UpdateProfile />}
                  ></Route>
                </Routes>
                <Footer />
              </Router>
            </RequestState>
          </AlertState>
        </UserState>
      </ElectionState>
    </>
  );
};

export default App;
