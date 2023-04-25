import React, { useEffect } from "react";
import { useState } from "react";
import { API } from "./source";
import { useNavigate } from "react-router-dom";
import { Navbar } from "./navbar";
import axios from "axios";

export function Cart() {
  const [cartitems, setCartitems] = useState([]);

  const getDetails = () => {
    fetch(`${API}/products/cartitems`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((pdt) => {
        setCartitems(pdt);
      });
  };

  useEffect(() => getDetails(), []);

  const navigate = useNavigate();

  console.log(cartitems);
  const initialprice = 0;
  const totalprice = cartitems.reduce(
    (price, itemincart) => price + parseInt(itemincart.price),
    initialprice
  );
const key = "rzp_test_DypJTWTkkevDJU"

  async function initPayment(data){
    const options = {
      key: key,
      amount: data.amount,
      currency: data.currency,
      description: "Test transaction",
      orderid: data.id,
      handler: function (response) {
        fetch(`${API}/payments/verify`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ response}),
        })
          .then((data) => data.json())
          .then((data1) => {
            console.log(data1);
          });
      },
      notes: {
        address:" Razorpay Corporate Office"
    },
    theme: {
        color: "#3399cc"
    }
   
    };
     const rzp1 = new window.Razorpay(options)
     rzp1.open();
  };

  async function handlePayment() {
    await fetch(`${API}/payments/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: totalprice }),
    })
      .then((data) => data.json())
      .then((data1) => {
        initPayment(data1.data);
      });
  }

  return (
    <div>
      <Navbar cartitem={cartitems.length} />
      <div className="cart">
        {cartitems.length === 0 && (
          <div className="noitems">
            <h1>No items Added</h1>
          </div>
        )}
        <h2 className="cart-heading">CART ITEMS</h2>
        {cartitems.map((itemincart) => (
          <div className="cartitems-container">
            <div className="item">
              <img className="cartitem-image" src={itemincart.image}></img>
              <div className="cartitem-details">
                <h5>
                  {itemincart.name} {itemincart.rating}
                </h5>
                <h2>Rs{itemincart.price}</h2>
              </div>
              <div className="cartitem-details">
                <h2>PRICE</h2>
                <h3>Rs{itemincart.price}</h3>
                <button
                  className="add-remove"
                  type="submit"
                  onClick={() =>
                    fetch(`${API}/products/cart/${itemincart.id}`, {
                      method: "DELETE",
                      body: JSON.stringify(itemincart.id),
                    })
                      .then((data) => data.json())
                      .then(() => {
                        getDetails();
                      })
                  }
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
        <div className="total">
          <h1>Total price : Rs{totalprice}</h1>
          <button onClick={handlePayment} className="button btn" type="submit">
            Buy
          </button>
        </div>
      </div>
    </div>
  );
}
