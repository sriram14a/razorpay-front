import React, { useEffect } from "react"
import { useState } from "react";
import { API } from "./source";
import { Navbar } from "./navbar";

export function Products() {
   
    const [product, setProduct] = useState([]);
    useEffect(() => {
      fetch(`${API}/products/products`, {
        method: "GET",
      })
        .then((data) => data.json())
        .then((pdt) => {setProduct(pdt);
        });
    }, []);

    console.log(product)

    function addtocart(itemNew){
        fetch(`${API}/products/cart`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(itemNew),
          })
            .then((data) => data.json())
            .then(() => console.log(itemNew));
         
    }

    return (
        <div>
            <Navbar/>
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