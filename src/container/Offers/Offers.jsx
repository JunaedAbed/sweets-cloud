import React from "react";

import { SubHeading } from "../../components";
import { images } from "../../constants";
import "./Offers.css";

const Offers = () => (
  <div className="app__bg-2 app__wrapper section__padding" id="offers">
    <div className="app__wrapper_info">
      <SubHeading title="Limited Time Offer" />
      <h1 className="headtext__cormorant">Special Edition</h1>

      <div className="app__offers-content">
        <div className="app__offers-content_quote">
          <img src={images.quote} alt="quote_image" />
          <p className="p__opensans">
            The special edition comes with special packaging and extra love.
            This is for limited time only. Let's grab it and become part of our
            special customers.
          </p>
        </div>
        {/* <p className="p__opensans">
          {" "}
          auctor sit iaculis in arcu. Vulputate nulla lobortis mauris eget sit.
          Nulla scelerisque scelerisque congue ac consequat, aliquam molestie
          lectus eu. Congue iaculis integer curabitur semper sit nunc.{" "}
        </p> */}
      </div>

      <div className="app__offers-sign">
        <p>
          Buy Any Items At Flat 20 Taka Discount for Our Grand Opening! Use
          FREEDELIVERY code.
        </p>
      </div>
    </div>
  </div>
);

export default Offers;
