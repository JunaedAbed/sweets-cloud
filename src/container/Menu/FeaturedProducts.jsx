import React from "react";

import { SubHeading } from "../../components";
import Products from "../../components/Products/Products";
import "./FeaturedProducts.css";

const FeaturedProducts = ({ featuredProducts }) => (
  <div className="app__specialMenu flex__center section__padding" id="featured">
    <div className="app__specialMenu-title">
      <SubHeading title="Menu that fits your pallatte" />
      <h1 className="headtext__cormorant">Featured Products</h1>
    </div>

    <div className="app__specialMenu-menu">
      <Products products={featuredProducts} />
    </div>
  </div>
);

export default FeaturedProducts;
