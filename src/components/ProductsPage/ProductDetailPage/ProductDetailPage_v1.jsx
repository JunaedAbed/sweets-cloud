import { InputLabel, MenuItem, Select, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { commerce } from "../../../libs/commerce";
import SubHeading from "../../SubHeading/SubHeading";
import RelatedProducts from "./RelatedProducts/RelatedProducts";

import "./ProductDetailPage.css";
import { FormProvider, useForm } from "react-hook-form";

const ProductDetailPage = ({ onAddtoCart }) => {
  const { id } = useParams();
  const methods = useForm();

  const [product, setProduct] = useState("");
  const [variants, setVariants] = useState([]);
  const [variant, setVariant] = useState("");

  const fetchProduct = async () => {
    const product = await commerce.products.retrieve(id);

    setProduct(product);

    const variants = product.variant_groups.map((group) =>
      group.options.map((option) => ({
        id: option.id,
        name: option.name,
        price: option.price.formatted_with_symbol,
      }))
    );

    setVariants(variants);

    setVariant(variants.map((variant) => variant[0]));
  };

  useEffect(() => {
    fetchProduct();

    window.scrollTo(0, 0);
  }, [id]);

  console.log(product);
  console.log("variantsss", variants);
  console.log("Variant", variant);
  console.log("price", variant);

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
              <FormProvider {...methods}>
                <form>
                  <InputLabel className="app__detail-inputLabel">
                    {product.variant_groups.map((item) => item.name)}
                  </InputLabel>
                  <Select
                    defaultValue={variant}
                    value={variant.name}
                    fullWidth
                    onChange={(e) => setVariant(e.target.value.split(" "))}
                  >
                    {variants.map((item) =>
                      item.map((variant) => (
                        <MenuItem
                          key={variant.id}
                          value={`${variant.name.replace(/ /g, "")} ${
                            variant.price
                          }`}
                        >
                          {variant.name}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                  <br />
                  <br />
                  <Typography
                    variant="body1"
                    className="p__opensans"
                    style={{ lineHeight: "1.75rem" }}
                    gutterBottom
                  >
                    {variant && variant[0].price
                      ? variant[0].price
                      : variant[1]}
                  </Typography>

                  <button
                    type="submit"
                    className="custom__button"
                    style={{ marginTop: "2.5rem" }}
                    onClick={() =>
                      onAddtoCart(product.id, 1, "optn_ZM8X5nPVbOwpv4")
                    }
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
