import React from "react";
import {
  AboutUs,
  FeaturedProducts,
  FindUs,
  Header,
  Offers,
} from "../../container";

const Home = ({ featuredProducts }) => {
  return (
    <div>
      <Header />
      <AboutUs />
      <FeaturedProducts featuredProducts={featuredProducts} />
      <Offers />
      <FindUs />
    </div>
  );
};

export default Home;
