import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@material-ui/core";
import React from "react";

import useStyles from "./styles";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  const classes = useStyles();

  return (
    <Card variant="outlined" className={classes.root}>
      <CardActionArea component={Link} to={`/view/${product.id}`}>
        <CardMedia
          image={product.image.url}
          title={product.name}
          className={classes.media}
        />
        <CardContent style={{ backgroundColor: "black" }}>
          <div className={classes.cardContent}>
            <Typography variant="h6" className="p__opensans">
              {product.name}
            </Typography>
          </div>
          <Typography variant="body2" className="p__opensans" gutterBottom>
            {product.price.formatted_with_symbol}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Product;
