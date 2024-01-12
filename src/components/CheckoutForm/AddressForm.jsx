import {
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Button,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { commerce } from "../../libs/commerce";

import FormInput from "./FormInput";

const AddressForm = ({ checkoutToken, next }) => {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingDivisions, setShippingDivisions] = useState([]);
  const [shippingDivision, setShippingDivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");
  const [isShippingOptionsLoaded, setIsShippingOptionsLoaded] = useState(false);

  const methods = useForm();

  const countries = Object.entries(shippingCountries).map(([code, name]) => ({
    id: code,
    label: name,
  }));

  const subdivisions = Object.entries(shippingDivisions).map(
    ([code, name]) => ({
      id: code,
      label: name,
    })
  );

  const options = shippingOptions.map((sO) => ({
    id: sO.id,
    label: `${sO.description} - (${sO.price.formatted_with_symbol})`,
  }));

  const fetchSubdivisions = async (checkoutTokenId, countryCode) => {
    const { subdivisions } =
      await commerce.services.localeListShippingSubdivisions(
        checkoutTokenId,
        countryCode
      );

    setShippingDivisions(subdivisions);
    setShippingDivision(Object.keys(subdivisions)[0]);
  };

  useEffect(() => {
    const fetchShippingCountries = async (checkoutTokenId) => {
      const { countries } = await commerce.services.localeListShippingCountries(
        checkoutTokenId
      );

      setShippingCountries(countries);
      setShippingCountry(Object.keys(countries)[0]);
    };
    fetchShippingCountries(checkoutToken.id);
  }, [checkoutToken]);

  useEffect(() => {
    if (shippingCountry) {
      fetchSubdivisions(checkoutToken.id, shippingCountry);
    }
  }, [shippingCountry, checkoutToken]);

  useEffect(() => {
    if (shippingDivision) {
      const fetchShippingOptions = async (
        checkoutTokenId,
        country,
        region = null
      ) => {
        const options = await commerce.checkout.getShippingOptions(
          checkoutTokenId,
          { country, region }
        );

        setShippingOptions(options);
        setShippingOption(options[0].id);
        setIsShippingOptionsLoaded(true);
      };
      fetchShippingOptions(checkoutToken.id, shippingCountry, shippingDivision);
    }
  }, [shippingDivision, checkoutToken, shippingCountry]);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) =>
            next({ ...data, shippingCountry, shippingDivision, shippingOption })
          )}
        >
          <Grid container spacing={3}>
            <FormInput
              name="firstName"
              label="First name"
              defaultValue=" "
              required
            />
            <FormInput name="lastName" label="Last name" required />
            <FormInput name="address" label="Address" required />
            <FormInput name="email" label="Email" required />
            <FormInput name="phone" label="Phone Number" required />
            <FormInput name="city" label="City" required />
            <FormInput name="zip" label="Zip / Postal code" />

            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select
                value={shippingCountry}
                fullWidth
                onChange={(e) => setShippingCountry(e.target.value)}
              >
                {countries.map((country) => (
                  <MenuItem key={country.id} value={country.id}>
                    {country.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Division</InputLabel>
              <Select
                value={shippingDivision}
                defaultValue=""
                fullWidth
                onChange={(e) => setShippingDivision(e.target.value)}
              >
                {subdivisions.map((subdivision) => (
                  <MenuItem key={subdivision.id} value={subdivision.id}>
                    {subdivision.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select
                value={shippingOption}
                fullWidth
                onChange={(e) => setShippingOption(e.target.value)}
              >
                {options.map((options) => (
                  <MenuItem key={options.id} value={options.id}>
                    {options.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>

          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button component={Link} to="/cart" variant="outlined">
              Back to Cart
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!isShippingOptionsLoaded}
            >
              Next
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
