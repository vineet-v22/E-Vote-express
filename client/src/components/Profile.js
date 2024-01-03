import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/user/UserContext";
import AlertContext from "../contexts/alert/AlertContext";

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const { successful } = useContext(AlertContext);
  const navigate = useNavigate();
  const getProfile = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_HOST}:5000/api/auth/getuser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: sessionStorage.getItem("username") }),
      }
    );
    const json = await response.json();
    setUser(json.user);
  };

  useEffect(() => {
    getProfile();
  }, []);
  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("uname");
    successful("Logout successful!");
    setTimeout(() => {
      navigate("/");
      window.location.reload();
    }, 2000);
  };

  const update = () => {
    console.log("update");
    navigate("/updateprofile");
  };

  return (
    <>
      <section>
        <table border={3}>
          <thead>
            <tr>
              <td colSpan={2}>
                <h1>Your Profile</h1>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Username</td>
              <td>{user.username}</td>
            </tr>
            <tr>
              <td>First Name</td>
              <td>{user.first_name}</td>
            </tr>
            <tr>
              <td>Lastname</td>
              <td>{user.last_name}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{user.email}</td>
            </tr>
            <tr>
              <td>Date of birth</td>
              <td>{user.dob}</td>
            </tr>
            <tr>
              <td>City</td>
              <td>{user.city}</td>
            </tr>
            <tr>
              <td>Pin Code</td>
              <td>{user.pin_code}</td>
            </tr>
            <tr>
              <td colSpan={2}>
                <button onClick={update}>Update Profile</button>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <button onClick={logout}>Logout</button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </>
  );
};

export default Profile;
