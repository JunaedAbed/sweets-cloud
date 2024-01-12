import React, { useState } from "react";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@material-ui/core";

import { Link } from "react-router-dom";
import { DeleteRounded, Add, Remove } from "@material-ui/icons";

import useStyles from "./styles";
import CustomLoader from "../../../common/CustomLoader";

const CartItem = ({ item, handleUpdateQty, handleRemoveFromCart }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  const handleUpdateQtyWithLoader = async (itemId, newQuantity) => {
    try {
      setLoading(true);
      await handleUpdateQty(itemId, newQuantity);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromCartWithLoader = async (itemId) => {
    try {
      setLoading(true);
      await handleRemoveFromCart(itemId);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card variant="outlined" style={{ backgroundColor: "black" }}>
      <CardActionArea component={Link} to={`/view/${item.product_id}`}>
        <CardMedia
          image={item.image.url}
          alt={item.name}
          className={classes.media}
        />
        <CardContent className={classes.content}>
          <Typography variant="h5" className="p__opensans" gutterBottom>
            {item.name}
          </Typography>
          <Typography variant="h6" style={{ color: "lightgrey" }}>
            {item.line_total.formatted_with_symbol}
          </Typography>
          <Typography
            variant="subtitle1"
            style={{ color: "lightgrey" }}
            className="p__opensans"
          >
            {item.selected_options.length
              ? item.selected_options.map((key) => key.group_name)
              : "No selections"}
            {": "}
            {item.selected_options.length
              ? item.selected_options.map((key) => key.option_name)
              : "No selections"}
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions className={classes.cartActions}>
        <div className={classes.buttons}>
          <IconButton
            aria-label="Subtract"
            onClick={() =>
              handleUpdateQtyWithLoader(item.id, item.quantity - 1)
            }
            disabled={loading}
          >
            <Remove style={{ color: "lightgrey" }} />
          </IconButton>
          <Typography className="p__opensans">{item.quantity}</Typography>
          <IconButton
            aria-label="Add"
            onClick={() =>
              handleUpdateQtyWithLoader(item.id, item.quantity + 1)
            }
            disabled={loading}
          >
            <Add style={{ color: "lightgrey" }} />
          </IconButton>
        </div>
        <IconButton
          size="small"
          color="secondary"
          aria-label="Remove"
          onClick={() => handleRemoveFromCartWithLoader(item.id)}
          disabled={loading}
        >
          {loading ? (
            <CustomLoader size={20} color="secondary" />
          ) : (
            <DeleteRounded />
          )}
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default CartItem;
