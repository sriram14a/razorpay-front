import React, { useEffect } from "react"
import { useState } from "react";
import { API } from "./source";
import { Navbar } from "./navbar";


export function Products() {
   
    const [product, setProduct] = useState([]);
  const [cartitems, setCartitems] = useState([]);

    useEffect(() => {
      fetch(`${API}/products/products`, {
        method: "GET",
      })
        .then((data) => data.json())
        .then((pdt) => {setProduct(pdt);
        });
    }, []);

    console.log(product)

    const [userData, setUserData] = useState("");
 
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
const email = userData.email

    function addtocart(itemNew){
         console.log(itemNew)
        fetch(`${API}/products/cart`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({email:email,image:itemNew.image,id:itemNew.id,name:itemNew.name,price:itemNew.price,rating:itemNew.rating}),
          })
            .then((data) => data.json())
            .then(() => console.log(itemNew));
         
    }

    const getDetails = () => {
        fetch(`${API}/products/cartitems/${email}`, {
          method: "GET",
        })
          .then((data) => data.json())
          .then((pdt) => {
            setCartitems(pdt);
          });
      };
    
      useEffect(() => getDetails(), [email]);
   

    return (
        <div>
            <Navbar cartitem = {cartitems.length}/>
        <img className="cover-image" src="https://m.media-amazon.com/images/I/71qlKqpJnlL._SX3000_.jpg" alt=""/>
        <div className="item-container">
            {product.map((itemNew) => <div className="item-card">
                <img src={itemNew.image} className="item-image"></img>
                <div className="item-name">{itemNew.name}</div>
                <div className="item-rating">{itemNew.rating}</div>
                <div className="item-pricing">${itemNew.price}</div>
                <button className="btn" type="submit"
                    onClick={() => addtocart(itemNew)}
                >ADD TO CART</button>
            </div>)}
        </div>
        </div>
    )
}