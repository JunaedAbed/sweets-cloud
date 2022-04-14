import React from "react";

import { images } from "../../constants";
import "./AboutUs.css";

const AboutUs = () => (
  <div
    className="app__aboutus app__bg flex__center section__padding"
    id="about"
  >
    <div className="app__aboutus-content flex__center">
      <div className="app__aboutus-content_about">
        <h1 className="headtext__cormorant">About Us</h1>
        <img src={images.spoon} alt="aboutus_spoon" className="spoon__img" />
        <p className="p__opensans">
          We are here with the best chefs in the country to enrich your taste
          bud with our premium quality sweets and bakery items. We believe in
          quality than quantity. Sweets Cloud maintains it's quality in every
          section. Packaging, ingredients, hygiene, delivery - whatever you
          name.
        </p>
        <button className="custom__button" type="button">
          <a href="#footer">Know More</a>
        </button>
      </div>

      <div className="app__aboutus-content_knife flex__center">
        <img src={images.chocolate} alt="chocolate" />
      </div>

      <div className="app__aboutus-content_history">
        <h1 className="headtext__cormorant">Our Story</h1>
        <img src={images.spoon} alt="history_spoon" className="spoon__img" />
        <p className="p__opensans">
          The main important aspect for any sweet is it's freshness. Any sweet
          item will lose it's freshness by 50% on the next day of it's
          production. So we are here to serve you the sweets within 4 hours of
          making it! Sounds amazing, right? Order now!
        </p>
        <button className="custom__button" type="button">
          <a href="#contact">Know More</a>
        </button>
      </div>
    </div>
  </div>
);

export default AboutUs;
