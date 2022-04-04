import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@material-ui/core";
import React, { memo } from "react";

import { useBouncyShadowStyles } from "@mui-treasury/styles/shadow/bouncy";

import useStyles from "./styles";
import { Link } from "react-router-dom";

const ProductPage = memo(({ product }) => {
  const classes = useStyles();
  const shadowStyles = useBouncyShadowStyles();

  return (
    <Card
      variant="contained"
      className={(classes.root, shadowStyles.root)}
      style={{ height: "100%", backgroundColor: "black" }}
    >
      <CardActionArea component={Link} to={`/view/${product.id}`}>
        <CardMedia
          image={product.image.url}
          title={product.name}
          className={classes.media}
        />
        <CardContent style={{ backgroundColor: "black" }}>
          <div className={classes.cardContent}>
            <Typography variant="h6" className="p__opensans" gutterBottom>
              {product.name}
            </Typography>
          </div>
          <Typography
            variant="caption"
            style={{ color: "lightgrey" }}
            className="p__opensans"
          >
            {product.categories.map((idx) => idx.name)}
          </Typography>
          <Typography variant="body2" className="p__opensans" gutterBottom>
            {product.price.formatted_with_symbol}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
});

export default ProductPage;
