import React from "react";
import { Grid } from "@material-ui/core";

import Product from "./Product/Product";
import useStyles from "./styles";

const Products = ({ products }) => {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <Grid container spacing={3}>
        {products.map(
          (product) =>
            product.active && (
              <Grid item key={product.id} xs={12} sm={6} lg={3}>
                <Product product={product} />
              </Grid>
            )
        )}
      </Grid>
    </main>
  );
};

export default Products;
