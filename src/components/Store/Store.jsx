import { MenuItem, Select, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";

import { SubHeading } from "..";
import { commerce } from "../../libs/commerce";
import ProductsPage from "../ProductsPage/ProductsPage";

import "./Store.css";

const Store = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("All");
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState("");

  const EmptyCategory = () => (
    <Typography variant="subtitle1" style={{ marginBottom: "4rem" }}>
      No Products Found!
    </Typography>
  );

  const fetchCategories = async () => {
    const { data } = await commerce.categories.list();

    setCategories(data.map((key) => key));
  };

  const handleNextButton = async () => {
    const { data } = await commerce.products.list({
      page: page + 1,
      limit: 16,
      sortBy: "name",
    });

    setPage(page + 1);
    setProducts(data);
    window.scrollTo(0, 0);
  };

  const handlePrevButton = async () => {
    const { data } = await commerce.products.list({
      page: page - 1,
      limit: 16,
      sortBy: "name",
    });

    setPage(page - 1);
    setProducts(data);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, meta } = await commerce.products.list({
        limit: 16,
        sortBy: "name",
        page: 1,
      });

      setProducts(data);
      setLastPage(meta.pagination.total_pages);
    };

    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      if (category !== "All") {
        const { data } = await commerce.products.list({
          category_slug: [category],
          active: 1,
          sortBy: "name",
        });

        setCategoryProducts(data);
      }
    };
    fetchCategoryProducts();
  }, [category]);

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
            <MenuItem key="All" value="All">
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

        {category === "All" && (
          <div>
            <Typography
              className="flex__center"
              style={{ marginTop: "5rem", color: "lightgrey" }}
            >
              Page {page} of {lastPage}
            </Typography>
            <button
              type="button"
              className="custom__button"
              disabled={page === 1}
              style={{
                marginTop: "1rem",
                marginRight: "3rem",
                padding: "0.5rem 2rem 0.5rem 2rem",
              }}
              onClick={handlePrevButton}
            >
              Prev
            </button>
            <button
              type="button"
              className="custom__button"
              disabled={page === lastPage}
              style={{ marginTop: "1rem", padding: "0.5rem 2rem 0.5rem 2rem" }}
              onClick={handleNextButton}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Store;
