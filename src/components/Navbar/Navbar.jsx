import { Badge } from "@material-ui/core";
import React, { useState } from "react";

import { GiHamburgerMenu } from "react-icons/gi";
import { GiShoppingBag } from "react-icons/gi";
import { MdOutlineRestaurantMenu } from "react-icons/md";

import images from "../../constants/images";
import "./Navbar.css";

const Navbar = ({ totalItems }) => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <>
      <nav className="app__navbar">
        <div className="app__navbar-logo">
          <a href="/">
            <img src={images.sweets} alt="app logo"></img>
          </a>
        </div>
        <ul className="app__navbar-links">
          <li className="p__opensans">
            <a href="/">Home</a>
          </li>
          <li className="p__opensans">
            <a href="/store">Sweets</a>
          </li>

          <li className="p__opensans">
            <a href="/#about">About</a>
          </li>
          <li className="p__opensans">
            <a href="/#contact">Contact</a>
          </li>
        </ul>

        <div className="app__navbar-login">
          <a href="./#offers" className="p__opensans">
            Discounts
          </a>
          <div />
          <a href="/cart" className="p__opensans">
            <Badge badgeContent={totalItems} color="secondary">
              <GiShoppingBag color="#fff" fontSize={27} />
            </Badge>
          </a>
        </div>

        <div className="app__navbar-smallscreen">
          <div className="app__navbar-miniCart">
            <a
              href="/cart"
              className="p__opensans"
              style={{ margin: "0 1.5rem" }}
            >
              <Badge badgeContent={totalItems} color="secondary">
                <GiShoppingBag color="#fff" fontSize={27} />
              </Badge>
            </a>
          </div>
          <GiHamburgerMenu
            color="#fff"
            fontSize={27}
            onClick={() => setToggleMenu(true)}
          />

          {toggleMenu && (
            <div className="app__navbar-smallscreen_overlay flex__center slide-bottom">
              <MdOutlineRestaurantMenu
                fontSize={27}
                className="overlay__close"
                onClick={() => setToggleMenu(false)}
              />
              <ul className="app__navbar-smallscreen_links">
                <li className="p__opensans">
                  <a href="/" onClick={() => setToggleMenu(false)}>
                    Home
                  </a>
                </li>
                <li className="p__opensans">
                  <a href="/store" onClick={() => setToggleMenu(false)}>
                    Sweets
                  </a>
                </li>

                <li className="p__opensans">
                  <a href="/#about" onClick={() => setToggleMenu(false)}>
                    About
                  </a>
                </li>
                <li className="p__opensans">
                  <a href="/#contact" onClick={() => setToggleMenu(false)}>
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
