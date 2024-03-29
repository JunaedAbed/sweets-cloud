import { List, ListItem, ListItemText, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";

const Review = ({ checkoutToken, shippingData }) => {
  const [productPrice, setProductPrice] = useState(0);
  const [deliveryCost, setDeliveryCost] = useState(0);
  const [sum, setSum] = useState(0);

  useEffect(() => {
    setProductPrice(
      checkoutToken.subtotal.formatted_with_symbol
        .split("k")[1]
        .replace(/,/g, "")
    );

    if (shippingData.shippingOption) {
      const selectedShippingOption = checkoutToken.shipping_methods.find(
        (method) => method.id === shippingData.shippingOption
      );

      if (selectedShippingOption) {
        const formattedDeliveryCost =
          selectedShippingOption.price.formatted_with_symbol
            .split("k")[1]
            .replace(/,/g, "");

        setDeliveryCost(formattedDeliveryCost);
      }
    }
  }, [checkoutToken, shippingData.shippingOption]);

  useEffect(() => {
    setSum(parseInt(productPrice, 10) + parseInt(deliveryCost, 10));
  }, [checkoutToken, productPrice, deliveryCost]);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>
      <List disablePadding>
        {checkoutToken.line_items.map((product) => (
          <ListItem style={{ padding: "10px 0" }} key={product.name}>
            <ListItemText
              primary={product.name}
              secondary={`${product.selected_options[0].group_name}: ${product.selected_options[0].option_name}, Quantity: ${product.quantity}`}
            />

            <Typography variant="body2">
              {product.line_total.formatted_with_symbol}
            </Typography>
          </ListItem>
        ))}

        <ListItem style={{ padding: "10px 0" }}>
          <ListItemText secondary="Delivery Cost" />
          <Typography variant="body2">Tk{deliveryCost}</Typography>
        </ListItem>

        <ListItem style={{ padding: "0px 0px" }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
            {`Tk${sum.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}.00`}
          </Typography>
        </ListItem>
      </List>
    </>
  );
};

export default Review;
