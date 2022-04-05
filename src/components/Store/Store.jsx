import { MenuItem, Select, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";

import { SubHeading } from "..";
import { commerce } from "../../libs/commerce";
import ProductsPage from "../ProductsPage/ProductsPage";

import "./Store.css";

const Store = ({ products }) => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("All Items");
  const [categoryProducts, setCategoryProducts] = useState([]);

  const EmptyCategory = () => (
    <Typography variant="subtitle1" style={{ marginBottom: "4rem" }}>
      No Products Found!
    </Typography>
  );

  const fetchCategories = async () => {
    const { data } = await commerce.categories.list();

    setCategories(data.map((key) => key));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      if (category !== "All Items") {
        const { data } = await commerce.products.list({
          category_slug: [category],
          active: 1,
        });

        setCategoryProducts(data);
      }
    };
    fetchCategoryProducts();
  }, [category]);

  console.log(categories);
  console.log(category);
  console.log(categoryProducts);

  return (
    <div>
      <div className="app__store flex__center section__padding" id="featured">
        <div className="app__store-title">
          <SubHeading title="Choose what you love" />
          <h1 className="headtext__cormorant">Products</h1>
        </div>

        <div className="app__store-categories">
          <Select
            value={category}
            defaultValue="All"
            fullWidth
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <MenuItem key="All Items" value="All Items">
              All Items
            </MenuItem>
            {categories.map((category) => (
              <MenuItem key={category.slug} value={category.slug}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </div>

        <div className="app__store-menu">
          {categoryProducts ? (
            <ProductsPage
              products={category === "All" ? products : categoryProducts}
            />
          ) : (
            EmptyCategory()
          )}
        </div>
      </div>
    </div>
  );
};

export default Store;
