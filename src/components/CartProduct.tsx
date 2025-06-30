import { useEffect, useState } from "react";
//import { NavLink } from "react-router-dom";
//import { useState } from 'react'
import "../assets/css/main.css";
import { urlApp } from "./Variables";
import { Modal } from "react-bootstrap";

function Product() {
  //To use API date we must first declare the variable type than we will call them inside the program.
  type Product = {
    cart_product_name: string;
    cart_product_avatar: string;
    cart_price: number;
    Category_name: string;
    cart_qty: number;
  };

  const [data, setData] = useState<Product[]>([]);

  let user = localStorage.getItem("userEmail");

  if (!user) {
    useEffect(() => {
      fetch(`${urlApp}productcart.php?u=${user}`)
        .then((response) => response.json())
        .then((jsonData) => setData(jsonData))
        .catch((error) => console.error("Error fetching data:", error));
    }, []);

    //Checking if user is not yet login into the system

    return (
      <>
        <div className="container">
          <div className="row mb-5 p-5" style={{ marginBottom: "100px" }}>
            <div className="col-12">
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
          </div>
        </div>

        <Modal
          id="exampleModal"
          title="Se connecter"
          body="Ceci est le contenu de la modal Bootstrap."
        />
      </>
    );
  }
  //If login account display cart information
  return (
    <>
      <section className="mt-50 mb-50">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="table-responsive">
                <table className="table shopping-summery text-center clean">
                  <thead>
                    <tr className="main-heading">
                      <th scope="col">Image</th>
                      <th scope="col">Nom</th>
                      <th scope="col">Prix</th>
                      <th scope="col">Qty</th>
                      <th scope="col">Subtotal</th>
                      <th scope="col">Supprimer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((product, index) => (
                      <tr id={"remove-" + index}>
                        <td className="image product-thumbnail">
                          <img
                            src={urlApp + product.cart_product_avatar}
                            alt="#"
                          />
                        </td>

                        <td className="product-des product-name">
                          <h5 className="product-name">
                            <a>{product.cart_product_name}</a>
                          </h5>
                        </td>
                        <td className="price" data-title="Price">
                          <span> {product.cart_price}$</span>
                        </td>
                        <td className="text-center" data-title="Stock">
                          <div className="detail-qty border radius  m-auto">
                            <a
                              href="#"
                              id="cartminus"
                              style={{
                                fontSize: "16px",
                                cursor: "pointer",
                                position: "absolute",
                                bottom: "0",
                                right: "8px",
                                color: "#707070",
                              }}
                            >
                              <i className="fi-rs-angle-small-down"></i>
                            </a>

                            <span className="qty-val" id="qty_">
                              {product.cart_qty}
                            </span>

                            <a
                              style={{
                                fontSize: "16px",
                                cursor: "pointer",
                                position: "absolute",
                                right: "8px",
                                top: "0",
                                color: "#707070",
                              }}
                              id="cartplus"
                            >
                              <i className="fi-rs-angle-small-up"></i>
                            </a>
                          </div>
                        </td>
                        <td className="text-right" data-title="Cart">
                          <span id="amount_"></span>$
                        </td>
                        <td className="action" data-title="Supprime">
                          <a
                            style={{ cursor: "pointer" }}
                            className="text-muted"
                          >
                            <i className="fi-rs-trash"></i>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="divider center_icon mt-50 mb-50">
                <i className="fi-rs-fingerprint"></i>
              </div>
              <div className="row mb-50">
                <div className="col-lg-6 col-md-12">
                  <div className="mb-30 mt-50">
                    <div className="heading_s1 mb-3">
                      <h4>Applique Coupon</h4>
                    </div>
                    <div className="total-amount">
                      <div className="left">
                        <div className="coupon">
                          <form id="couponfrm" method="post">
                            <div className="form-row row justify-content-center">
                              <div className="form-group col-lg-6">
                                <input
                                  className="font-medium"
                                  name="Coupon"
                                  placeholder="Entre votre coupon"
                                  id="couponId"
                                />
                              </div>
                              <div className="form-group col-lg-6">
                                <button
                                  className="btn  btn-sm"
                                  type="submit"
                                  id="btncoupon"
                                >
                                  <i className="fi-rs-label mr-10"></i>
                                  Vérifier
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-12">
                  <div className="border p-md-4 p-30 border-radius cart-totals">
                    <div className="heading_s1 mb-3">
                      <h4>Cart Total</h4>
                    </div>
                    <div className="table-responsive">
                      <table className="table">
                        <tbody>
                          <tr>
                            <td className="cart_total_label">Cart Subtotal</td>
                            <td className="cart_total_amount">
                              <span className="font-lg fw-900 text-brand">
                                <span id="subtotal"></span>$
                              </span>
                            </td>
                            <input type="hidden" id="price_total" value="" />
                          </tr>
                          <tr>
                            <td className="cart_total_label">Shipping</td>
                            <td className="cart_total_amount">
                              {" "}
                              <i className="ti-gift mr-5"></i> Free Shipping
                            </td>
                          </tr>
                          <tr>
                            <td className="cart_total_label">Total</td>
                            <td className="cart_total_amount">
                              <strong>
                                <span className="font-xl fw-900 text-brand">
                                  <span id="sumtotal"></span>$
                                </span>
                              </strong>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Product;
