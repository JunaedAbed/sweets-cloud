import {
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import CartItem from "./CartItem/CartItem";

import useStyle from "./styles";

const Cart = ({
  cart,
  handleUpdateQty,
  handleRemoveFromCart,
  handleEmptyCart,
}) => {
  const classes = useStyle();
  const [loading, setLoading] = useState(false);

  const handleCartDiscard = async () => {
    setLoading(true);
    try {
      await handleEmptyCart();
    } catch (error) {
      console.error("Error discarding the cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const EmptyCart = () => (
    <Typography variant="subtitle1" style={{ marginBottom: "4rem" }}>
      You have no items in your cart{" "}
      <Link to="/" className={classes.link}>
        Start adding some!
      </Link>
    </Typography>
  );

  if (!cart.line_items)
    return (
      <div className={classes.spinner}>
        <CircularProgress />
      </div>
    );

  const FilledCart = () => (
    <>
      <Grid container spacing={3}>
        {cart.line_items.map((item) => (
          <Grid item xs={12} sm={6} key={item.id}>
            <CartItem
              item={item}
              handleUpdateQty={handleUpdateQty}
              handleRemoveFromCart={handleRemoveFromCart}
            />
          </Grid>
        ))}
      </Grid>

      <div className={classes.cardDetails}>
        <Typography variant="h4" gutterBottom>
          Subtotal: {cart.subtotal.formatted_with_symbol}
        </Typography>
        <div>
          <Button
            className={classes.emptyButton}
            size="large"
            type="button"
            variant="contained"
            color="secondary"
            onClick={handleCartDiscard}
          >
            {loading ? <CircularProgress size={20} /> : "Empty"}
          </Button>
          <Button
            component={Link}
            to="/checkout"
            className={classes.checkoutButton}
            size="large"
            type="button"
            variant="contained"
            color="primary"
          >
            Checkout
          </Button>
        </div>
      </div>
    </>
  );

  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography variant="h4" className={classes.title} gutterBottom>
        Your Shopping Cart
      </Typography>
      {!cart.line_items.length ? EmptyCart() : FilledCart()}
    </Container>
  );
};

export default Cart;
