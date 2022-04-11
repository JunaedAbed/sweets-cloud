import React, { useState } from "react";
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
  const [discountCode, setDiscountCode] = useState("");
  const [discountPrice, setDiscountPrice] = useState("Tk0.00");
  const [sum, setSum] = useState(
    parseInt(checkoutToken.live.subtotal.formatted.replace(/,/g, ""), 10) +
      parseInt(
        checkoutToken.live.shipping.available_options[0].price.formatted,
        10
      )
  );

  const handleDiscountClick = async (e) => {
    e.preventDefault();

    if (!discountCode) {
      alert("No code added!");
    } else {
      const res = await commerce.checkout.checkDiscount(checkoutToken.id, {
        code: discountCode,
      });

      console.log(res);

      if (!res.valid) {
        alert("Invalid Code!");
      } else {
        setDiscountPrice(res.live.discount.amount_saved.formatted_with_symbol);
        setSum(
          parseInt(res.live.total.formatted.replace(/,/g, ""), 10) +
            parseInt(
              res.live.shipping.available_options[0].price.formatted.replace(
                /,/g,
                ""
              )
            ),
          10
        );
        setDiscountCode(null);
        alert("Discount Code added Successfully");
      }
    }
  };

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
            <Typography variant="body2" color="secondary">
              -{discountPrice}
            </Typography>
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
