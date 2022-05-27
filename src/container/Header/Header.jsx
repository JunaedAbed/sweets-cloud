import React from "react";

import { SubHeading } from "../../components";
import { images } from "../../constants";
import "./Header.css";

const Header = () => (
  <div className="app__header app__wrapper section__padding" id="home">
    <div className="app__wrapper_info">
      <SubHeading title="Chase the new flavour" />
      <h1 className="app__header-h1">Welcome to the cloud of sweets</h1>
      <p className="p__opensans" style={{ margin: "2rem 0 " }}>
        Let's Get Lost Like A Cloud With Our Premium Sweets..!
      </p>
      <button type="button" className="custom__button">
        <a href="#featured">Explore More</a>
      </button>
    </div>

    <div className="app__wrapper_img">
      {/* this is header image */}
      <img src={images.welcome} alt="header img" />
    </div>
  </div>
);

export default Header;
