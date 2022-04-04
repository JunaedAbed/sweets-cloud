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
  const [noDiscountCode, setNoDiscountCode] = useState(true);
  const [invalidDiscountCode, setInvalidDiscountCode] = useState(true);
  const [liveObject, setLiveObject] = useState([]);
  const [discountPrice, setDiscountPrice] = useState(
    checkoutToken.live.subtotal.formatted_with_symbol
  );

  const handleDiscountClick = async (e) => {
    e.preventDefault();

    if (!discountCode) {
      setNoDiscountCode(true);
      setInvalidDiscountCode(false);
      alert("No code added!");
    } else {
      const res = await commerce.checkout.checkDiscount(checkoutToken.id, {
        code: discountCode,
      });

      if (!res.valid) {
        setInvalidDiscountCode(true);
        alert("Invalid Code!");
      } else {
        setInvalidDiscountCode(false);
        setLiveObject(res.live);
        setDiscountPrice(res.live.total.formatted_with_symbol);
        setDiscountCode(null);
        alert("Discount Code added Successfully");
      }

      setNoDiscountCode(false);

      console.log(res);
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

          <ListItem style={{ padding: "10px 0" }}>
            <ListItemText primary="Total" />
            <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
              {discountPrice}
            </Typography>
          </ListItem>
        </List>
      </>
    </div>
  );
};

export default Discount;
