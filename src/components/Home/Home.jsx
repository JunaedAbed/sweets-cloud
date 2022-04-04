import React from "react";
import { FooterOverlay, Newsletter } from "..";
import {
  AboutUs,
  Chef,
  FeaturedProducts,
  FindUs,
  Footer,
  Gallery,
  Header,
  Intro,
  Laurels,
  Offers,
} from "../../container";

const Home = ({ featuredProducts }) => {
  return (
    <div>
      <Header />
      <AboutUs />
      <FeaturedProducts featuredProducts={featuredProducts} />
      {/* <Chef />
      <Intro />
      <Laurels />
    <Gallery /> */}
      <Offers />
      <FindUs />
      <FooterOverlay />
      {/* <Newsletter /> */}
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
