import React from "react";
import { Button, Divider, Typography } from "@material-ui/core";

import Review from "./Review";
import Discount from "./Discount";

const PaymentForm = ({
  shippingData,
  checkoutToken,
  backStep,
  nextStep,
  onCaptureCheckout,
}) => {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const orderData = {
      line_items: checkoutToken.line_items,
      customer: {
        firstname: shippingData.firstName,
        lastname: shippingData.lastName,
        email: shippingData.email,
        phone: shippingData.phone,
      },
      shipping: {
        name: "Domestic",
        street: shippingData.address,
        town_city: shippingData.city,
        county_state: shippingData.shippingDivision,
        postal_zip_code: shippingData.zip,
        country: shippingData.shippingCountry,
      },
      fulfillment: { shipping_method: shippingData.shippingOption },
      payment: {
        gateway: "manual",
        manual: {
          id: "gway_Vw7G4Eb4RZ7jw2",
        },
      },
    };
    onCaptureCheckout(checkoutToken.id, orderData)
      .then((order) => {})
      .catch((error) => {
        // Something went wrong during capture:
        console.log(error);
      });

    // timeout();

    nextStep();
  };

  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Discount checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: "20px 0" }}>
        Payment Method
      </Typography>

      <form onSubmit={(e) => handleSubmit(e)}>
        <Typography>Pay with Cash on Delivery</Typography>
        <br /> <br />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="outlined" onClick={backStep}>
            Back
          </Button>
          <Button
            variant="contained"
            type="submit"
            color="primary"
            onSubmit={(e) => handleSubmit(e)}
          >
            Confirm Order
          </Button>
        </div>
      </form>
    </>
  );
};

export default PaymentForm;
