import React from "react";

import { SubHeading } from "../../components";
import { images } from "../../constants";

import "./FindUs.css";

const FindUs = () => (
  <div className="app__bg app__wrapper section__padding" id="contact">
    <div className="app__wrapper_info">
      <SubHeading title="Contact" />
      <h1 className="headtext__cormorant" style={{ marginBottom: "3rem" }}>
        Find Us
      </h1>
      <div className="app__wrapper-content">
        <p className="p__opensans">
          Shwapno, House No-39(Ground Floor),
          <br /> Road No-27(old) 16(new),
          <br /> Dhanmondi, Dhaka
          <br />
          (Inside Shwapno Super Shop)
        </p>
        <p
          className="p__cormorant"
          style={{ color: "#DCCA87", margin: "2rem 0" }}
        >
          Opening Hours
        </p>
        <p className="p__opensans">Everyday: 09:00 AM - 08:00 PM</p>
      </div>
      <a
        type="button"
        href="mailto:sweets.cloudbd@gmail.com"
        className="custom__button"
        style={{ marginTop: "2rem" }}
      >
        Contact Us
      </a>
    </div>

    <div className="app__findus_img">
      <img src={images.sweets} alt="findus_img" />
    </div>
  </div>
);

export default FindUs;
