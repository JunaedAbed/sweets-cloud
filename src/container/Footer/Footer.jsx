import React from "react";
import { FiFacebook, FiInstagram, FiTwitter } from "react-icons/fi";

import { images } from "../../constants";
import "./Footer.css";

const Footer = () => (
  <div className="app__footer section__padding" id="footer">
    <div className="app__footer-links">
      <div className="app__footer-links_contact">
        <h1 className="app__footer-headtext">Contact Us</h1>
        <p className="p__opensans">Dhaka, Bangladesh</p>
        <p className="p__opensans">+880 1302449669</p>
        <br />
        <p className="p__opensans" style={{ textTransform: "lowercase" }}>
          Facebook: sweetscloudbd
        </p>
        <p className="p__opensans" style={{ textTransform: "lowercase" }}>
          Instagram: sweets.cloudbd
        </p>
      </div>

      <div className="app__footer-links_logo">
        <img src={images.sweets} alt="footer logo" />
        <p className="p__opensans">
          "Let's get lost like a cloud with our Premium Sweets..!"
        </p>
        <img
          src={images.spoon}
          alt="spoon"
          className="spoon__img"
          style={{ marginTop: 15 }}
        />
        <div className="app__footer-links_icons">
          <a href="https://www.facebook.com/sweetscloudbd/" target="_blank">
            <FiFacebook />
          </a>
          <FiTwitter />
          <a href="https://www.instagram.com/sweets.cloudbd/" target="_blank">
            <FiInstagram />
          </a>
        </div>
      </div>

      <div className="app__footer-links_work">
        <h1 className="app__footer-headtext">Working Hours</h1>
        <p className="p__opensans">Saturday - Thursday: </p>
        <p className="p__opensans">10:00 Am - 02:00 Am</p>
        <p className="p__opensans">Friday: </p>
        <p className="p__opensans">Closed</p>
      </div>
    </div>

    <div className="footer__copyright">
      <p className="p__opensans">2022 Sweets Cloud. All Right Reserved © </p>
    </div>
  </div>
);

export default Footer;
