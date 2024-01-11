import React, { useEffect, useState } from "react";

import { Navbar, Store, ProductDetailPage, Cart, Checkout } from "./components";
import "./App.css";
import { commerce } from "./libs/commerce";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import { Footer } from "./container";

const App = () => {
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const handleAddtoCart = async (productId, quantity, variant) => {
    console.log(productId);
    console.log(quantity);
    console.log(variant);
    const reponse = await commerce.cart.add(productId, quantity, variant);

    setCart(reponse);
    alert("Item added!");
  };

  const handleUpdateQty = async (productId, quantity) => {
    const reponse = await commerce.cart.update(productId, { quantity });

    setCart(reponse);
  };

  const handleRemoveFromCart = async (productId) => {
    const reponse = await commerce.cart.remove(productId);

    setCart(reponse);
  };

  const handleEmptyCart = async () => {
    const reponse = await commerce.cart.empty();

    setCart(reponse);
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

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <Router>
      <div>
        <Navbar totalItems={cart.total_items} />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/store" element={<Store />} />
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
