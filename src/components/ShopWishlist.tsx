import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { urlApp } from "./Variables.tsx";
import { useCart } from "./CartContext";
import "../assets/css/main.css";
import axios from "axios";
import ProductLoader from "./ProductLoader.tsx";
import { Modal } from "react-bootstrap";

// PHP API to remove wishlist item
const RemoveToWishlist = async (itemId: string, userId: string) => {
  const response = await fetch(`${urlApp}productwhiteremove.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      item_id: itemId,
      user_id: userId,
    }),
  });

  const result = await response.json();
  return result;
};

function ShopWishlist() {
  type Product = {
    Product_name: string;
    Picture: string;
    Price: number;
    Category_name: string;
    Product_id: number;
  };

  const { addToCart } = useCart();
  const [successIds, setSuccessIds] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Product[]>([]);
  const [removeWishlistIds, setRemoveWishlistIds] = useState<number[]>([]);

  const userId = localStorage.getItem("userToken") || "";

  useEffect(() => {
    if (!userId) return;

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
  }, [userId]);

  if (!userId) {
    return (
      <>
        <div className="col-lg-9">
          <div className="shop-product-fillter">
            <div className="totall-product">
              <p>
                Désolé, vous devez vous connecter{" "}
                <strong>pour voir votre wishlist</strong>
              </p>
              <p>
                <a
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  href="#"
                >
                  Connectez-vous ici -&gt;
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
  }

  if (loading) return <ProductLoader />;
  if (error) return <p className="text-danger">{error}</p>;

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

      if (result === true) {
        setSuccessIds((prev) => [...prev, product.Product_id]);

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

  const handleRemoveToWishlist = async (itemId: number) => {
    if (!userId) {
      alert("Veuillez vous connecter pour supprimer de la liste de souhaits.");
      return;
    }

    try {
      const response = await RemoveToWishlist(String(itemId), userId);
      if (response.success) {
        // Optional animation state
        setRemoveWishlistIds((prev) => [...prev, itemId]);

        // Remove from UI
        setData((prevData) =>
          prevData.filter((product) => product.Product_id !== itemId)
        );

        // Remove animation state after delay (if needed)
        setTimeout(() => {
          setRemoveWishlistIds((prev) => prev.filter((id) => id !== itemId));
        }, 2000);
      } else {
        alert("Erreur: " + response.message);
      }
    } catch (error) {
      console.error("Wishlist error:", error);
      alert("Une erreur est survenue lors de la suppression.");
    }
  };

  return (
    <>
      <div className="shop-product-fillter">
        <div className="totall-product">
          <p>
            Nous avons trouvé{" "}
            <strong className="text-brand">{data.length}</strong> articles dans
            votre wishlist
          </p>
        </div>
      </div>

      {data.map((product, index) => (
        <div className="col-lg-4 col-md-4 col-sm-6 col-xs-6" key={index}>
          <div className="product-cart-wrap mb-30">
            <div className="product-img-action-wrap">
              <div className="product-img product-img-zoom">
                <a>
                  <img
                    className="default-img resizeimg"
                    src={urlApp + product.Picture}
                    alt="item image"
                  />
                  <img
                    className="hover-img resizeimg"
                    src={urlApp + product.Picture}
                    alt="Item image"
                  />
                </a>
              </div>
              <div className="product-action-1">
                <button
                  className="action-btn hover-up"
                  onClick={() => handleRemoveToWishlist(product.Product_id)}
                >
                  <i
                    className={
                      removeWishlistIds.includes(product.Product_id)
                        ? "fi-rs-check"
                        : "fi-rs-trash"
                    }
                  ></i>
                </button>
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

              <div className="row mt-2 product-action-update">
                <div className="col-6 product-price">
                  <span>{product.Price}$</span>
                </div>
                <div className="col-6">
                  <button
                    aria-label="Ajouter au panier"
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
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default ShopWishlist;
