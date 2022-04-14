import React from "react";

import { SubHeading } from "../../components";
import { images } from "../../constants";
import "./Offer.css";

const Offer = () => (
  <div className="app__offer flex__center">
    <div className="app__offer-title">
      <SubHeading title="For your interest" />
      <h1 className="headtext__cormorant">Special Offer</h1>
    </div>
    <div className="app__offer-image flex__center">
      <img src={images.offer01} alt="" />
    </div>
  </div>
);

export default Offer;
