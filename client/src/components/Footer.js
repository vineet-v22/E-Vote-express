import React from "react";
import "../css/footer.css";
const Footer = () => {
  return (
    <div>
      <footer className="footer-distributed">
        <div className="footer-left">
          <h3>eVoteExpress</h3>

          <p className="footer-links">
            <a href="#">Home</a>
            <a href="#">Elections</a>
            <a href="#">Results</a>
            <a href="#">Contact Us</a>
          </p>

          <p className="footer-company-name">
            Copyright 2023 &copy; <strong>eVoteExpress</strong> All rights
            reserved.
          </p>
        </div>

        <div className="footer-center">
          <div>
            <i className="fa fa-solid fa-location-dot"></i>
            <p>
              <span>IIT Indore</span>
            </p>
          </div>

          <div>
            <i className="fa fa-phone"></i>
            <p>+918467013749</p>
          </div>

          <div>
            <i className="fa fa-envelope"></i>
            <p>
              <a href="#">hiteshmaurya56@gmail.com</a>
            </p>
          </div>
        </div>

        <div className="footer-right">
          <p className="footer-company-about">
            Elevate your civic engagement with our user-friendly platform, where
            every vote counts and democracy thrives in the digital age.
          </p>
          <div className="footer-icons">
            <a href="">
              <i className="fa fa-facebook"></i>
            </a>
            <a href="">
              <i className="fa fa-instagram"></i>
            </a>
            <a href="">
              <i className="fa fa-linkedin"></i>
            </a>
            <a href="">
              <i className="fa fa-twitter"></i>
            </a>
            <a href="">
              <i className="fa fa-youtube"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
