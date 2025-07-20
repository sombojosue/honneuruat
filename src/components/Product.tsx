import { useEffect, useState } from "react";
import { useCart } from "./CartContext";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "../assets/css/main.css";
import { urlApp, urlAppApi } from "./Variables";
import ProductLoader from "./ProductLoader";
import { addToWishlist } from "./AddToWishlist.tsx";
import Modal from "./Modal.tsx";

function Product() {
  type Product = {
    Product_name: string;
    Picture: string;
    Price: number;
    Category_name: string;
    Product_id: number;
  };

  const { addToCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Product[]>([]);
  const [successIds, setSuccessIds] = useState<number[]>([]); // ✅ track success products
  const [wishlistIds, setWishlistIds] = useState<number[]>([]);
  const visibleCount = 12; //Limit the number of item to be showing into the home page
  const userId = localStorage.getItem("userToken") || "";

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await axios.get<Product[]>(
          `${urlAppApi}products.php?page=1`
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

  const handleAddToWishlist = async (itemId: number) => {
    try {
      const response = await addToWishlist(String(itemId), userId);
      if (response.success) {
        //alert("Produit ajouté à votre liste de souhaits.");
        setWishlistIds((prev) => [...prev, itemId]);

        // Optional: revert icon after 2 seconds
        setTimeout(() => {
          setWishlistIds((prev) => prev.filter((id) => id !== itemId));
        }, 2000);
      } else {
        alert("Erreur: " + response.message);
      }
    } catch (error) {
      console.error("Wishlist error:", error);
      alert("Une erreur est survenue lors de l'ajout à la liste.");
    }
  };

  const handleAddToCart = async (product: Product) => {
    const updateQty = 1;
    try {
      const result = await addToCart({
        id: product.Product_id,
        name: product.Product_name,
        price: product.Price,
        qty: updateQty,
        avatar: product.Picture,
      });

      // ✅ Only update icon when PHP API says success
      if (result === true) {
        setSuccessIds((prev) => [...prev, product.Product_id]);

        // Optional: revert icon after 2 seconds
        setTimeout(() => {
          setSuccessIds((prev) =>
            prev.filter((id) => id !== product.Product_id)
          );
        }, 10000);
      }
    } catch (err) {
      console.error("Erreur panier:", err);
    }
  };

  if (loading) return <ProductLoader />;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <>
      {data.slice(0, visibleCount).map((product) => (
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
                  to={"/Details?q=" + product.Product_id}
                  aria-label="Aperçu rapide"
                  className="action-btn hover-up"
                >
                  <i className="fi-rs-eye"></i>
                </NavLink>

                {!userId && (
                  <button
                    className="action-btn hover-up"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    <i className="fi-rs-heart" />
                  </button>
                )}

                {userId && (
                  <button
                    className="action-btn hover-up"
                    onClick={() => handleAddToWishlist(product.Product_id)}
                  >
                    <i
                      className={
                        wishlistIds.includes(product.Product_id)
                          ? "fi-rs-check"
                          : "fi-rs-heart"
                      }
                    />
                  </button>
                )}
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

              {/* Price and cart section */}
              <div className="row mt-2 product-action-update">
                <div className="col-6 product-price">
                  <span>{product.Price}$</span>
                </div>

                <div className="col-6">
                  {!userId && (
                    <button
                      className="action-btn hover-up"
                      style={{ float: "right" }}
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      <i className="fi-rs-shopping-bag-add"></i>
                    </button>
                  )}

                  {userId && (
                    <button
                      className="action-btn hover-up"
                      style={{ float: "right" }}
                      onClick={() => handleAddToCart(product)}
                    >
                      <i
                        className={
                          successIds.includes(product.Product_id)
                            ? "fi-rs-check"
                            : "fi-rs-shopping-bag-add"
                        }
                      ></i>
                    </button>
                  )}
                </div>
              </div>
              {/* End of price and cart */}
            </div>
          </div>
        </div>
      ))}

      <Modal
        id="exampleModal"
        title="Se connecter"
        body="Ceci est le contenu de la modal Bootstrap."
      />
    </>
  );
}

export default Product;
