import React, { useEffect, useState } from "react";

import { Navbar, Store, ProductDetailPage, Cart, Checkout } from "./components";
import "./App.css";
import { commerce } from "./libs/commerce";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import { Footer } from "./container";

const App = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const fetchFeaturedProducts = async () => {
    const { data } = await commerce.products.list({ limit: 8 });

    setFeaturedProducts(data);
  };

  const fetchProducts = async () => {
    const { data } = await commerce.products.list({ sortBy: "name" });

    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const handleAddtoCart = async (productId, quantity, variant) => {
    const { cart } = await commerce.cart.add(productId, quantity, variant);

    setCart(cart);
  };

  const handleUpdateQty = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity });

    setCart(cart);
  };

  const handleRemoveFromCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);

    setCart(cart);
  };

  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty();

    setCart(cart);
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );

      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  // console.log(cart);

  useEffect(() => {
    fetchFeaturedProducts();
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <Router>
      <div>
        <Navbar totalItems={cart.total_items} />
        <Routes>
          <Route
            exact
            path="/"
            element={<Home featuredProducts={featuredProducts} />}
          />
          <Route
            exact
            path="/store"
            element={
              <Store
                products={products}
                // categories={categories}
                // category={category}
              />
            }
          />
          <Route
            exact
            path="/view/:id"
            element={<ProductDetailPage onAddtoCart={handleAddtoCart} />}
          />
          <Route
            exact
            path="/cart"
            element={
              <Cart
                cart={cart}
                handleUpdateQty={handleUpdateQty}
                handleRemoveFromCart={handleRemoveFromCart}
                handleEmptyCart={handleEmptyCart}
              />
            }
          ></Route>
          <Route
            exact
            path="/checkout"
            element={
              <Checkout
                cart={cart}
                order={order}
                onCaptureCheckout={handleCaptureCheckout}
                error={errorMessage}
              />
            }
          ></Route>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
