import React, { useEffect, useState } from "react";
import { IconButton, MenuItem, Select, Typography } from "@material-ui/core";

import { useParams } from "react-router-dom";

import { commerce } from "../../../libs/commerce";
import SubHeading from "../../SubHeading/SubHeading";
import RelatedProducts from "./RelatedProducts/RelatedProducts";

import "./ProductDetailPage.css";
import { FormProvider } from "react-hook-form";
import { Add, Remove } from "@material-ui/icons";

const ProductDetailPage = ({ onAddtoCart }) => {
  const { id } = useParams();

  const [product, setProduct] = useState("");
  const [options, setOptions] = useState([]);
  const [option, setOption] = useState("Select an Option");
  const [quantity, setQuantity] = useState(1);
  const [selectedOptionPrice, setSelectedOptionPrice] = useState("0.00");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await commerce.products.retrieve(id);

        setProduct(product);

        if (product.variant_groups && product.variant_groups.length > 0) {
          let variants = product.variant_groups[0].options.map((option) => {
            let variantInfo = {};

            variantInfo.key = option.id;
            variantInfo.value = option.id;
            variantInfo.text = option.name;
            variantInfo.price = option.price.formatted;

            return variantInfo;
          });

          setOptions(variants);
        } else {
          setOptions([]);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();

    window.scrollTo(0, 0);
  }, [id]);

  const handleOptionChange = (e) => {
    const newSelectedOption = e.target.value;

    if (newSelectedOption !== "Select an Option") {
      setOption({ [product.variant_groups[0].id]: newSelectedOption });

      const selectedOptionData = options.find(
        (option) => option.value === newSelectedOption
      );

      if (selectedOptionData) {
        setSelectedOptionPrice(selectedOptionData.price);
      }
    } else {
      setOption("Select an Option");
      setSelectedOptionPrice("0.00");
    }
  };

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

          {product && options && (
            <>
              <FormProvider>
                <form>
                  <Typography className="app__detail-inputLabel">
                    {product.variant_groups.map((item) => item.name)}
                  </Typography>
                  <br />

                  <Select
                    value={option.text}
                    defaultValue="Select an Option"
                    fullWidth
                    onChange={handleOptionChange}

                    // onChange={(e) => {
                    //   e.target.value !== "Select an Option"
                    //     ? setOption({
                    //         [product.variant_groups[0].id]: e.target.value,
                    //       })
                    //     : setOption("Select an Option");
                    // }}
                  >
                    <MenuItem key="Select an Option" value="Select an Option">
                      Select an Option
                    </MenuItem>
                    {options.map((option) => (
                      <MenuItem key={option.key} value={option.value}>
                        {option.text}
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
                    TK{" "}
                    {(
                      parseFloat(selectedOptionPrice) +
                      parseFloat(product.price.formatted)
                    ).toFixed(2)}
                  </Typography>
                  <br />
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      color: "lightgrey",
                    }}
                  >
                    <IconButton
                      aria-label="Subtract"
                      onClick={() => {
                        setQuantity(quantity - 1);
                      }}
                      disabled={quantity === 1}
                    >
                      <Remove style={{ color: "lightgrey" }} />
                    </IconButton>
                    <Typography>{quantity}</Typography>
                    <IconButton
                      aria-label="Add"
                      onClick={() => {
                        setQuantity(quantity + 1);
                      }}
                    >
                      <Add style={{ color: "lightgrey" }} />
                    </IconButton>
                  </div>

                  <button
                    type="submit"
                    className="custom__button"
                    style={{ marginTop: "2.5rem" }}
                    onClick={(e) => {
                      e.preventDefault();
                      if (
                        option === "Select an Option" ||
                        e.target.value === "Select an Option"
                      ) {
                        alert("Select an option");
                        return;
                      }

                      onAddtoCart(product.id, quantity, option);
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
