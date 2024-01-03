import React, { useContext } from "react";
import "../css/signup.css";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import AlertContext from "../contexts/alert/AlertContext";
import UserContext from "../contexts/user/UserContext";
const UpdateProfile = () => {
  const { successful, unSuccessful } = useContext(AlertContext);
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const curYear = new Date().getFullYear();
    const dobYear = new Date(user.dob).getFullYear();
    if (curYear - dobYear < 18) {
      unSuccessful("Age should be atleast 18 years.");
      return;
    }

    if (user.first_name === "Admin") {
      unSuccessful("Name can't be Admin");
      return;
    }

    const response = await fetch(
      `http://${process.env.REACT_APP_HOST}:5000/api/auth/update`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    );
    const json = await response.json();
    if (json.error) unSuccessful(json.error);
    else {
      successful("Your profile has been updated.");
      setTimeout(() => {
        navigate(-1);
      }, 3000);
    }
  };

  return (
    <>
      <section>
        <div className="login-box">
          <form onSubmit={handleSubmit}>
            <h2>Update Profile</h2>
            <div className="input-box">
              <input
                type="text"
                name="first_name"
                id="first_name"
                onChange={handleOnChange}
                minLength={2}
                value={user.first_name}
                required
              />
              <label>First Name</label>
            </div>
            <div className="input-box">
              <input
                type="text"
                name="last_name"
                id="last_name"
                value={user.last_name}
                onChange={handleOnChange}
                required
              />
              <label>Last Name</label>
            </div>
            <div className="input-box">
              <input
                type="date"
                name="dob"
                id="dob"
                value={user.dob}
                onChange={handleOnChange}
                required
              />
              <label>Date of Birth</label>
            </div>
            <div className="input-box">
              <input
                type="password"
                name="password"
                id="password"
                onChange={handleOnChange}
                required
                minLength={5}
              />
              <label>New Password</label>
            </div>
            <div className="input-box">
              <input
                type="password"
                onChange={handleOnChange}
                name="cpassword"
                required
              />
              <label>Confirm Password</label>
            </div>

            <div className="input-box">
              <input
                type="text"
                name="city"
                id="city"
                value={user.city}
                onChange={handleOnChange}
                required
              />
              <label>City</label>
            </div>
            <div className="input-box">
              <input
                type="number"
                name="pin_code"
                value={user.pin_code}
                onChange={handleOnChange}
                required
              />
              <label>Pincode</label>
            </div>
            <button type="submit">Update Profile</button>
          </form>
        </div>
      </section>
    </>
  );
};

export default UpdateProfile;
