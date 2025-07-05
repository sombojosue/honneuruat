import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../assets/css/main.css";
import { urlApp } from "./Variables";
import axios from "axios";
import ProductLoader from "./ProductLoader";
import { addToWishlist } from "./AddToWishlist.tsx";

type Product = {
  Product_name: string;
  Picture: string;
  Price: number;
  Category_name: string;
  Product_id: number;
};

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

function CartProduct() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [dataResult, setDataResult] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>(
          `${urlApp}products.php/products`
        );
        setDataResult(response.data);
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

  return (
    <>
      <div className="shop-product-fillter">
        <div className="totall-product">
          <p>
            Nous avons trouvé{" "}
            <strong className="text-brand">{dataResult.length}</strong> articles
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
                  Featured <i className="fi-rs-angle-small-down"></i>
                </span>
              </div>
            </div>
            <div className="sort-by-dropdown">
              <ul>
                <li>
                  <a className="active" href="#">
                    Featured
                  </a>
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

      <div className="row product-grid-3">
        {dataResult.map((product) => (
          <div
            className="col-lg-4 col-md-4 col-sm-6 col-xs-6"
            key={product.Product_id}
          >
            <div className="product-cart-wrap mb-30">
              <div className="product-img-action-wrap">
                <div className="product-img product-img-zoom">
                  <NavLink to={`/Details?q=${product.Product_id}`}>
                    <img
                      className="default-img resizeimg"
                      src={`${urlApp}${product.Picture}`}
                      alt="item image"
                    />
                    <img
                      className="hover-img resizeimg"
                      src={`${urlApp}${product.Picture}`}
                      alt="item image hover"
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
                  <NavLink to={`/Details?q=${product.Product_id}`}>
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
      </div>
    </>
  );
}

export default CartProduct;
