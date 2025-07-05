import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { urlApp } from "./Variables.tsx";
//import { useState } from 'react'
import "../assets/css/main.css";
import axios from "axios";
import ProductLoader from "./ProductLoader";
import { Modal } from "react-bootstrap";

function ShopWhitelist() {
  //To use API date we must first declare the variable type than we will call them inside the program.
  type Product = {
    Product_name: string;
    Picture: string;
    Price: number;
    Category_name: string;
    Product_id: number;
  };

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Product[]>([]);

  //cheking if user is logging into the server
  const userId = localStorage.getItem("userToken") || "";
  if (userId) {
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await axios.get<Product[]>(
            `${urlApp}productwhitelist.php?u=${userId}`
          );
          setData(response.data);
        } catch (err) {
          console.error(err);
          setError("Échec de la récupération des produits.");
        } finally {
          setLoading(false);
        }
      };

      fetchProducts();
    }, []);

    if (loading) return <ProductLoader />;
    if (error) return <p className="text-danger">{error}</p>;
  }

  //Checking if user is not yet login into the system
  if (!userId)
    return (
      <>
        <div className="col-lg-9">
          <div className="shop-product-fillter">
            <div className="totall-product">
              <p>
                {" "}
                Désolé vous devrez vous connecter{" "}
                <strong>pour voir votre wishlist</strong>{" "}
              </p>
              <p>
                <a
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  href="#"
                >
                  Connecter vous ici -&gt;
                </a>
              </p>
            </div>
          </div>
        </div>

        <Modal
          id="exampleModal"
          title="Se connecter"
          body="Ceci est le contenu de la modal Bootstrap."
        />
      </>
    );

  return (
    <>
      <div className="shop-product-fillter">
        <div className="totall-product">
          <p>
            {" "}
            Nous avons trouvé{" "}
            <strong className="text-brand">{data.length}</strong> articles dans
            votre whitelist
          </p>
        </div>
        <div className="sort-by-product-area">
          <div className="sort-by-cover">
            <div className="sort-by-product-wrap">
              <div className="sort-by">
                <span>
                  <i className="fi-rs-apps-sort"></i>Trier par:
                </span>
              </div>
              <div className="sort-by-dropdown-wrap">
                <span>
                  {" "}
                  Featured <i className="fi-rs-angle-small-down"></i>
                </span>
              </div>
            </div>
            <div className="sort-by-dropdown">
              <ul>
                <li>
                  <a className="active">Featured</a>
                </li>
                <li>
                  <a href="sorted.php?order=priceasc">Prix: De bas en haut</a>
                </li>
                <li>
                  <a href="sorted.php?order=pricedesc">Prix: De haut en bas</a>
                </li>
                <li>
                  <a href="sorted.php?order=datedesc">
                    La date la plus récente
                  </a>
                </li>

                <li>
                  <a href="sorted.php?order=datedesc">
                    La date la plus ancienne
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {data.map((product, index) => (
        <div className="col-lg-4 col-md-4 col-sm-6 col-xs-6" key={index}>
          <div className="product-cart-wrap mb-30">
            <div className="product-img-action-wrap">
              <div className="product-img product-img-zoom">
                <NavLink to={"/Details?q=" + product.Product_id}>
                  <img
                    className="default-img resizeimg"
                    src={urlApp + product.Picture}
                    alt="item image"
                  />
                  <img
                    className="hover-img resizeimg"
                    src={urlApp + product.Picture}
                    alt="Item images"
                  />
                </NavLink>
              </div>
              <div className="product-action-1">
                <NavLink
                  to={"/Details?q=" + product.Product_id}
                  aria-label="Aperçu rapide"
                  className="action-btn hover-up"
                >
                  <i className="fi-rs-eye"></i>
                </NavLink>
              </div>
            </div>
            <div className="product-content-wrap">
              <div className="product-category">
                <NavLink to={"/Categorytype?q=" + product.Category_name}>
                  {product.Category_name}
                </NavLink>
              </div>
              <h2>
                <NavLink to={"/Details?q=" + product.Product_id}>
                  {product.Product_name}
                </NavLink>
              </h2>

              {/*Price and cart section*/}
              <div className="row mt-2 product-action-update">
                <div className="col-6 product-price">
                  <span>{product.Price}$</span>
                </div>

                <div className="col-6">
                  <button
                    aria-label="Ajouter au panier"
                    className="action-btn hover-up"
                    style={{ float: "right" }}
                  >
                    <i className="fi-rs-shopping-bag-add"></i>
                  </button>
                </div>
              </div>
              {/* End of price and cart */}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default ShopWhitelist;
