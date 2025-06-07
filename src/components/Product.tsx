import { useEffect, useState } from "react";
//import { useState } from 'react'
import "../assets/css/main.css";

function Product() {
  //To use API date we must first declare the variable type than we will call them inside the program.
  type Product = {
    Product_name: string;
    Picture: string;
    Price: number;
    Category_name: string;
  };

  const [data, setData] = useState<Product[]>([]);

  useEffect(() => {
    fetch("https://inovsell.com/products.php/products")
      .then((response) => response.json())
      .then((jsonData) => setData(jsonData))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <>
      {data.map((product, index) => (
        <div className="col-lg-3 col-md-4 col-sm-6 col-xs-6" key={index}>
          <div className="product-cart-wrap mb-30">
            <div className="product-img-action-wrap">
              <div className="product-img product-img-zoom">
                <a href="">
                  <img
                    className="default-img resizeimg"
                    src={"https://inovsell.com/" + product.Picture}
                    alt="item image"
                  />
                  <img
                    className="hover-img resizeimg"
                    src={"https://inovsell.com/" + product.Picture}
                    alt="Item images"
                  />
                </a>
              </div>
              <div className="product-action-1">
                <a
                  href=""
                  aria-label="aperçu rapide"
                  className="action-btn hover-up"
                >
                  <i className="fi-rs-eye"></i>
                </a>

                <button
                  aria-label="Ajouter a la Wishlist"
                  className="action-btn hover-up loaderbtn-"
                >
                  <i className="fi-rs-heart"></i>
                </button>
              </div>
            </div>
            <div className="product-content-wrap">
              <div className="product-category">
                <a href="">{product.Category_name}</a>
              </div>
              <h2>
                <a href="">{product.Product_name}</a>
              </h2>

              <br />

              <div className="product-price">
                <span>{product.Price}$</span>
              </div>

              <div className="product-action-1 show">
                <a
                  aria-label="Ajouter au panier"
                  className="action-btn hover-up"
                >
                  <i className="fi-rs-shopping-bag-add"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default Product;
