import React from "react";
import "../css/home.css";
import image from './vv-removebg-preview.png'
const Home = () => {
  return (
    <div>
      <section>
        <div className="quote">
          <h1>Step into the future of Voting right here!</h1>
          <p>We're revolutionizing democracy, empowering secure and convenient voting from anywhere. Say goodbye to lines and paperwork, hello to a modern, user-friendly experience. Join us for a brighter tomorrow.
          </p>
        </div>
        <div className="picture">
          <img src={image} alt="" />
        </div>
      </section>
    </div>
  );
};

export default Home;
