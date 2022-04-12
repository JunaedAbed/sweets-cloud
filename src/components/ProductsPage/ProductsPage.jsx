import React from "react";
import { Grid } from "@material-ui/core";

import useStyles from "./styles";
import ProductPage from "./ProductPage/ProductPage";

const ProductsPage = ({ products }) => {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <Grid container spacing={3}>
        {products.map(
          (product) =>
            product.active &&
            (products.length === 1 ? (
              <Grid item key={product.id} xs={12} sm={12} lg={12}>
                <ProductPage product={product} />
              </Grid>
            ) : products.length === 2 || products.length === 3 ? (
              <Grid item key={product.id} xs={12} sm={6} lg={6}>
                <ProductPage product={product} />
              </Grid>
            ) : (
              <Grid item key={product.id} xs={12} sm={6} lg={3}>
                <ProductPage product={product} />
              </Grid>
            ))
        )}
      </Grid>
    </main>
  );
};

export default ProductsPage;
