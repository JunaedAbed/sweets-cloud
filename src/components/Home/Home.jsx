import React, { useEffect, useState } from "react";
import {
  AboutUs,
  FeaturedProducts,
  FindUs,
  Header,
  // Coupon,
  // Offer,
} from "../../container";
import { commerce } from "../../libs/commerce";
import { Button, makeStyles } from "@material-ui/core";
import { ArrowUpwardRounded } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  floatingButton: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 1000,
    opacity: 1,
    transition: "opacity 0.3s ease-in-out",
  },
}));

const Home = () => {
  const classes = useStyles();

  const [featuredProducts, setFeaturedProducts] = useState([]);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    const scrollTop = window.scrollY;

    const buttonOpacity = scrollTop > 100 ? 1 : 0;

    document.getElementById("scroll-to-top-button").style.opacity =
      buttonOpacity;
  };

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
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <Header />
      <AboutUs />
      <FeaturedProducts featuredProducts={featuredProducts} />
      {/* <Coupon /> */}
      {/* <Offer /> */}
      <FindUs />
      <Button
        id="scroll-to-top-button"
        className={classes.floatingButton}
        variant="contained"
        color="secondary"
        onClick={handleScrollToTop}
        startIcon={<ArrowUpwardRounded />}
      >
        Top
      </Button>
    </div>
  );
};

export default Home;
