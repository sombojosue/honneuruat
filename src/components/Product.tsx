import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "../assets/css/main.css";
import { urlApp } from "./Variables";
import ProductLoaderHome from "./ProductLoaderHome";
import { addToWishlist } from "./AddToWishlist.tsx";

//Create a function to call add to wishlist
const handleAddToWishlist = async (itemId: number) => {
  const userId = localStorage.getItem("userToken") || "";
  if (!userId) {
    alert("Veuillez vous connecter pour ajouter à la liste de souhaits.");
    return;
  }

  try {
    const response = await addToWishlist(String(itemId), userId);
    if (response.success) {
      alert("Produit ajouté à votre liste de souhaits.");
    } else {
      alert("Erreur: " + response.message);
    }
  } catch (error) {
    console.error("Wishlist error:", error);
    alert("Une erreur est survenue lors de l'ajout à la liste.");
  }
};

function Product() {
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

  if (loading) return <ProductLoaderHome />;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <>
      {data.map((product) => (
        <div
          className="col-lg-3 col-md-4 col-sm-6 col-xs-6"
          key={product.Product_id}
        >
          <div className="product-cart-wrap mb-30">
            <div className="product-img-action-wrap">
              <div className="product-img product-img-zoom">
                <NavLink to={`/#`}>
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
              <div className="product-action-1">
                <NavLink
                  to={"/Details?q=" + product.Product_id}
                  aria-label="Aperçu rapide"
                  className="action-btn hover-up"
                >
                  <i className="fi-rs-eye"></i>
                </NavLink>

                <button
                  aria-label="Ajouter à la Wishlist"
                  className="action-btn hover-up loaderbtn-"
                  onClick={() => handleAddToWishlist(product.Product_id)}
                >
                  <i className="fi-rs-heart"></i>
                </button>
              </div>
            </div>

            <div className="product-content-wrap">
              <div className="product-category">
                <NavLink to={`/Categorytype?q=${product.Category_name}`}>
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

export default Product;
