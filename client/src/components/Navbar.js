import React from "react";
import "../css/navbar.css";
import logo from "./logo.png";
import { ToastContainer } from "react-toastify";
import "../css/toast.css";
import { Link } from "react-router-dom";

const Navbar = () => {

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        style={{ fontSize: "1.5em" }}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <header className="header">
        <Link to="/">
          <img src={logo} alt="eVoteExpress" className="logo" />
        </Link>
        <nav className="navbar">
          <ul className="navbar-list">
            <li>
              {sessionStorage.getItem("uname") !== "Admin" ? (
                <Link className="navbar-link" to="/">
                  Home
                </Link>
              ) : (
                <Link className="navbar-link" to="/elections">
                  Elections
                </Link>
              )}
            </li>
            <li>
              {sessionStorage.getItem("uname") === "Admin" ? (
                <Link className="navbar-link" to="/registrations">
                  Registrations
                </Link>
              ) : (
                <Link className="navbar-link" to="/elections">
                  Elections
                </Link>
              )}
            </li>
            <li>
              {sessionStorage.getItem("uname") === "Admin" ? (
                <Link className="navbar-link" to="/requests">
                  Requests
                </Link>
              ) : (
                <Link className="navbar-link" to="/results">
                  Results
                </Link>
              )}
            </li>
            <li>
              {sessionStorage.getItem("uname") === "Admin" ? (
                <Link className="navbar-link" to="/allusers">
                  All Users
                </Link>
              ) : (
                <Link className="navbar-link" to="/contactus">
                  Contact Us
                </Link>
              )}
            </li>
            {!sessionStorage.getItem("token") ? (
              <li>
                <Link className="navbar-link" to="/login">
                  Login
                </Link>
              </li>
            ) : (
              <li>
                <Link className="navbar-link" to="/profile">
                  {sessionStorage.getItem("uname")}
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
