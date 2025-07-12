import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "../assets/css/main.css";
import { urlApp } from "./Variables";
import ProductLoader from "./ProductLoader";

type Card = {
  cardnumber?: string; // facultatif
};

const ReservationProduct: React.FC<Card> = ({ cardnumber }) => {
  type Product = {
    Product_name: string;
    Picture: string;
    Price: number;
    Category_name: string;
    Product_id: number;
  };

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Product[]>([]);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await axios.get<Product[]>(
          `${urlApp}products.php/products`
        );
        setData(response.data);
      } catch (err) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchSubcategories();
  }, []);

  if (loading) return <ProductLoader />;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <>
      {!cardnumber &&
        data.map((product) => (
          <div
            className="col-lg-4 col-md-4 col-sm-6 col-xs-6"
            key={product.Product_id}
          >
            <div className="product-cart-wrap mb-30">
              <div className="product-img-action-wrap">
                <div className="product-img product-img-zoom">
                  <a>
                    <img
                      className="default-img resizeimg"
                      src={`${urlApp}${product.Picture}`}
                      alt={product.Product_name}
                    />
                    <img
                      className="hover-img resizeimg"
                      src={`${urlApp}${product.Picture}`}
                      alt={product.Product_name + " hover"}
                    />
                  </a>
                </div>
                <div className="product-action-1">
                  <NavLink
                    to={"/ReservationDetails?q=" + product.Product_id}
                    aria-label="Aperçu rapide"
                    className="action-btn hover-up"
                  >
                    <i className="fi-rs-eye"></i>
                  </NavLink>
                </div>
              </div>

              <div className="product-content-wrap">
                <div className="product-category">
                  <NavLink to={`/Reservationtype?q=${product.Category_name}`}>
                    {product.Category_name}
                  </NavLink>
                </div>

                <h2>
                  <NavLink to={"/ReservationDetails?q=" + product.Product_id}>
                    {product.Product_name}
                  </NavLink>
                </h2>
              </div>
            </div>
          </div>
        ))}

      {cardnumber &&
        data.map((product) => (
          <div
            className="col-lg-3 col-md-4 col-sm-6 col-xs-6"
            key={product.Product_id}
          >
            <div className="product-cart-wrap mb-30">
              <div className="product-img-action-wrap">
                <div className="product-img product-img-zoom">
                  <a>
                    <img
                      className="default-img resizeimg"
                      src={`${urlApp}${product.Picture}`}
                      alt={product.Product_name}
                    />
                    <img
                      className="hover-img resizeimg"
                      src={`${urlApp}${product.Picture}`}
                      alt={product.Product_name + " hover"}
                    />
                  </a>
                </div>
                <div className="product-action-1">
                  <NavLink
                    to={"/ReservationDetails?q=" + product.Product_id}
                    aria-label="Aperçu rapide"
                    className="action-btn hover-up"
                  >
                    <i className="fi-rs-eye"></i>
                  </NavLink>
                </div>
              </div>

              <div className="product-content-wrap">
                <div className="product-category">
                  <NavLink to={`/Reservationtype?q=${product.Category_name}`}>
                    {product.Category_name}
                  </NavLink>
                </div>

                <h2>
                  <NavLink to={"/ReservationDetails?q=" + product.Product_id}>
                    {product.Product_name}
                  </NavLink>
                </h2>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default ReservationProduct;
