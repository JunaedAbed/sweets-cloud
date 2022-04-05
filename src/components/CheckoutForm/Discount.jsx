import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { commerce } from "../../libs/commerce";

const Discount = ({ checkoutToken }) => {
  const [deliveryCost, setDeliveryCost] = useState(0);
  const [discountCode, setDiscountCode] = useState("");
  const [discountPrice, setDiscountPrice] = useState(
    checkoutToken.live.total.formatted_with_symbol
      .split("k")[1]
      .replace(/,/g, "")
  );
  const [sum, setSum] = useState(0);

  const handleDiscountClick = async (e) => {
    e.preventDefault();

    if (!discountCode) {
      alert("No code added!");
    } else {
      const res = await commerce.checkout.checkDiscount(checkoutToken.id, {
        code: discountCode,
      });

      if (!res.valid) {
        alert("Invalid Code!");
      } else {
        setDiscountPrice(
          res.live.total.formatted_with_symbol.split("k")[1]
        ).replace(/,/g, "");
        setDiscountCode(null);
        alert("Discount Code added Successfully");
      }
    }
  };

  useEffect(() => {
    setDeliveryCost(
      checkoutToken.live.shipping.available_options[0].price.formatted_with_symbol.split(
        "k"
      )[1]
    );
  }, [checkoutToken]);

  useEffect(() => {
    setSum(parseInt(deliveryCost, 10) + parseInt(discountPrice, 10));
  }, [checkoutToken, sum, discountPrice, deliveryCost]);

  console.log(checkoutToken);
  console.log(sum);
  console.log(discountPrice);
  console.log(deliveryCost);

  return (
    <div>
      <>
        <Typography variant="h6" gutterBottom style={{ marginTop: "1rem" }}>
          Discount
        </Typography>
        <List disablePadding>
          <ListItem style={{ padding: "10px 0" }}>
            <form onSubmit={handleDiscountClick}>
              <Input
                onChange={(e) => setDiscountCode(e.target.value)}
                placeholder="Enter discount code"
                style={{ marginRight: "2rem" }}
              />

              <Button
                variant="contained"
                type="submit"
                style={{
                  backgroundColor: "black",
                  color: "white",
                }}
              >
                Apply
              </Button>
            </form>
          </ListItem>

          <ListItem style={{ padding: "25px 0px 0px 0px" }}>
            <ListItemText secondary="Discount" />
            <Typography variant="body2" color="secondary">{`-Tk${
              sum - discountPrice
            }.00`}</Typography>
          </ListItem>
          <ListItem style={{ padding: "0px 0" }}>
            <ListItemText secondary="Delivery" />
            <Typography variant="body2">{`Tk${deliveryCost}`}</Typography>
          </ListItem>
          <ListItem style={{ padding: "10px 0" }}>
            <ListItemText primary="Total" />
            <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
              {`Tk${sum.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}.00`}
            </Typography>
          </ListItem>
        </List>
      </>
    </div>
  );
};

export default Discount;
