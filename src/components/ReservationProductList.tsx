import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "../assets/css/main.css";
import { urlApp, urlAppApi } from "./Variables";
import ReservationLoader from "./ReservationLoader";

const ReservationProduct: React.FC = () => {
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
  const [visibleCount, setVisibleCount] = useState(12);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await axios.get<Product[]>(
          `${urlAppApi}products.php/products`
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

  if (loading) return <ReservationLoader />;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <>
      {data.slice(0, visibleCount).map((product) => (
        <div
          className="col-lg-4 col-md-4 col-sm-6 col-xs-6"
          key={product.Product_id}
        >
          <div className="product-cart-wrap mb-30">
            <div className="product-img-action-wrap">
              <div className="product-img product-img-zoom">
                <NavLink to={"/ReservationDetails?q=" + product.Product_id}>
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
      {visibleCount < data.length && (
        <div className="text-center mt-4 mb-5">
          <button
            className="btn-load-more"
            onClick={() => setVisibleCount((prev) => prev + itemsPerPage)}
            aria-label="Charger plus"
          >
            <i className="fi-rs-angle-small-down"></i>
          </button>
        </div>
      )}
    </>
  );
};

export default ReservationProduct;
