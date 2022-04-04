import { InputLabel, MenuItem, Select, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { commerce } from "../../../libs/commerce";
import SubHeading from "../../SubHeading/SubHeading";
import RelatedProducts from "./RelatedProducts/RelatedProducts";

import "./ProductDetailPage.css";
import { FormProvider } from "react-hook-form";

const ProductDetailPage = ({ onAddtoCart }) => {
  const { id } = useParams();

  const [product, setProduct] = useState("");
  const [variants, setVariants] = useState([]);
  const [variant, setVariant] = useState("Select an Option");

  const fetchProduct = async () => {
    const product = await commerce.products.retrieve(id);

    setProduct(product);

    let variants = product.variant_groups[0].options.map((option) => {
      let variantInfo = {};

      variantInfo.key = option.id;
      variantInfo.value = option.id;
      variantInfo.text = option.name;

      return variantInfo;
    });

    setVariants(variants);

    // setVariant(variants[0]);
  };

  useEffect(() => {
    fetchProduct();

    window.scrollTo(0, 0);
  }, [id]);

  console.log(product);
  console.log("variantsss", variants);
  console.log("Variant", variant);

  return (
    <div>
      <div className="app__detail app__wrapper flex__center section__padding">
        <div className="app__detail-img">
          {product && <img src={product.image.url} alt="header img" />}
        </div>

        <div className="app__wrapper_info">
          {product && (
            <SubHeading title={product.categories.map((key) => key.name)} />
          )}
          {product && <h1 className="app__detail-h1">{product.name}</h1>}

          <Typography
            dangerouslySetInnerHTML={{ __html: product.description }}
            variant="body1"
            className="p__opensans"
            style={{ lineHeight: "1.75rem" }}
            gutterBottom
          />
          <br />

          {product && variants && (
            <>
              <FormProvider>
                <form>
                  <Typography className="app__detail-inputLabel">
                    {product.variant_groups.map((item) => item.name)}
                  </Typography>
                  <br />

                  <Select
                    value={variant.text}
                    defaultValue="Select an Option"
                    fullWidth
                    onChange={(e) => {
                      e.target.value !== "Select an Option"
                        ? setVariant({
                            [product.variant_groups[0].id]: e.target.value,
                          })
                        : setVariant("Select an Option");
                    }}
                  >
                    <MenuItem key="Select an Option" value="Select an Option">
                      Select an Option
                    </MenuItem>
                    {variants.map((variant) => (
                      <MenuItem key={variant.key} value={variant.value}>
                        {variant.text}
                      </MenuItem>
                    ))}
                  </Select>

                  <br />
                  <br />
                  <Typography
                    variant="body1"
                    className="p__opensans"
                    style={{ lineHeight: "1.75rem" }}
                    gutterBottom
                  >
                    {product.price.formatted_with_symbol}
                  </Typography>
                  <button
                    type="submit"
                    className="custom__button"
                    style={{ marginTop: "2.5rem" }}
                    onClick={(e) => {
                      e.preventDefault();
                      if (
                        variant === "Select an Option" ||
                        e.target.value === "Select an Option"
                      ) {
                        alert("Select an option");
                        return;
                      }
                      onAddtoCart(product.id, 1, variant);
                    }}
                  >
                    Add To Cart
                  </button>
                </form>
              </FormProvider>
            </>
          )}
        </div>
      </div>
      <div className="app__detail-related flex__center section__padding ">
        {product.related_products && <SubHeading title="You may also like" />}

        {product.related_products && (
          <RelatedProducts products={product.related_products} />
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
