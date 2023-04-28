import { Link, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useState } from "react";
import { API } from "./source";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { IconButton } from "@mui/material";

export function Navbar(cartitem) {
const items = cartitem
  const [userData, setUserData] = useState("");
  const [show, setShow] = useState(false);

  const Createstl = {
    display: show ? "block" : "none",
  };

  const navigate = useNavigate();
  useEffect(() => {
    fetch(`${API}/user/userdata`, {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => setUserData(data.data));
  }, []);

  const logout = () => {
    window.localStorage.clear();
    navigate("/");
  };
  return (
    <div className="navbar">
      <div className="navbar-name">
        <h1>OFFER ZONE</h1>
        <img
          className="offer-img"
          src="https://static.vecteezy.com/system/resources/previews/013/212/816/non_2x/discount-offer-tag-icon-shopping-coupon-symbol-sale-label-tag-with-percentage-sign-black-friday-discount-banner-or-coupon-vector.jpg"
          alt=""
        />
      </div>
      <div >
        <ul className="list-items">
          <li>
            <Link to="/products">HOME</Link>
          </li>
          <li>
            <Link to="/cart">
              <button className="button" type="submit">
                <img
                  className="cart-img"
                  src="https://toppng.com/uploads/preview/shopping-cart-png-image-shopping-cart-icon-sv-11562865326ta92uix1ak.png"
                />{" "}
                Cart <span className="cart-length">{items.cartitem}</span>
              </button>
            </Link>
          </li>
         <div className="profile">
         <h3 >
            {userData.firstname} {userData.lastname}
            <span>
            <IconButton
            sx={{ position: "relative" }}
            onClick={() => setShow(!show)}
          >
                <AccountCircleIcon sx={{ fontSize: "40px" }} />
                </IconButton>
              
                <span style={Createstl} onClick={logout} className="logout">Logout</span>
              
            </span>
          </h3>
         </div>
        </ul>
      </div>
    </div>
  );
}
