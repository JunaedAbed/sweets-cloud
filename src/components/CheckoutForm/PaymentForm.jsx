import React from "react";
import {
  Button,
  Card,
  Container,
  Divider,
  Typography,
} from "@material-ui/core";
// import {
//   CardElement,
//   Elements,
//   ElementsConsumer,
// } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";

import Review from "./Review";
import Discount from "./Discount";

// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = ({
  shippingData,
  checkoutToken,
  backStep,
  nextStep,
  onCaptureCheckout,
  timeout,
}) => {
  const handleSubmit = async (event) => {
    event.preventDefault();

    // const cardElement = elements.getElement(CardElement);

    // const { error, paymentMethod } = await stripe.createPaymentMethod({
    //   type: "card",
    //   // card: cardElement,
    // });

    const orderData = {
      line_items: checkoutToken.live.line_items,
      customer: {
        firstname: shippingData.firstName,
        lastname: shippingData.lastName,
        email: shippingData.email,
      },
      shipping: {
        name: "Domestic",
        street: shippingData.address,
        town_city: shippingData.city,
        county_state: shippingData.shippingDivision,
        postal_zip_code: shippingData.zip,
        note: shippingData.note,
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
      .then((order) => {
        // The checkout has been successfully captured and converted to an order using the manual payment method.
        // The payment instructions are provided on the order object. Payments on an order is an array, but capturing
        // checkouts only supports single payments, so we know it'll be the first (and only) payment on the order
        // console.log(
        //   order.payments[0].payment_source.method_payment_instructions
        // );
      })
      .catch((error) => {
        // Something went wrong during capture:
        console.log(error);
      });

    // timeout();

    nextStep();
  };

  console.log(shippingData);
  console.log(checkoutToken);
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
