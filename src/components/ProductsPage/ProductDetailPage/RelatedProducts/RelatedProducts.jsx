import React from "react";
import { Grid } from "@material-ui/core";

import useStyles from "./styles";
import RelatedProduct from "./RelatedProduct/RelatedProduct";

const ProductsPage = ({ products }) => {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} lg={4}>
            <RelatedProduct product={product} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
};

export default ProductsPage;
