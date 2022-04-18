import React, { useEffect, useState } from "react";
import {
  AboutUs,
  FeaturedProducts,
  FindUs,
  Header,
  Coupon,
  Offer,
} from "../../container";
import { commerce } from "../../libs/commerce";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  const fetchFeaturedProducts = async () => {
    const { data } = await commerce.products.list({
      sortBy: "created_at",
      sortDirection: "desc",
      limit: 8,
    });

    setFeaturedProducts(data);
  };

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  return (
    <div>
      <Header />
      <AboutUs />
      <FeaturedProducts featuredProducts={featuredProducts} />
      <Coupon />
      <Offer />
      <FindUs />
    </div>
  );
};

export default Home;
