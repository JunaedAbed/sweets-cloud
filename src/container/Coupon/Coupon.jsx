import React from "react";

import { SubHeading } from "../../components";
import { images } from "../../constants";
import "./Coupon.css";

const Coupon = () => (
  <div className="app__coupon app__wrapper section__padding" id="coupon">
    <div className="app__wrapper_info">
      <SubHeading title="Coupon Code" />
      <h1 className="headtext__cormorant">Discount</h1>

      <div className="app__coupon-content">
        <div className="app__coupon-content_quote">
          <img src={images.quote} alt="quote_image" />
          <p className="p__opensans">
            The special edition comes with special packaging and extra love.
            This is for limited time only. Let's grab it and become part of our
            special customers.
          </p>
        </div>
      </div>

      <div className="app__coupon-sign">
        <p>
          Buy Any Sweets Item and get Completely FREE Delivery for Our Grand
          Opening!
          <p style={{ marginTop: "2rem" }}> Use Coupon Code: FREEDELIVERY</p>
        </p>
      </div>
    </div>
  </div>
);

export default Coupon;
