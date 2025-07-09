import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "./CartContext";
import { NavLink } from "react-router-dom";
import "../assets/css/main.css";
import { urlApp } from "./Variables";
import { addToWishlist } from "./AddToWishlist.tsx";

export interface SearchResultItem {
  Picture: string;
  Product_name: string;
  Price: number;
  Category_name: string;
  Product_id: number;
  // Add other properties as needed
}

interface LocationState {
  results: SearchResultItem[];
  query: string;
  category: string;
}

function SearchResults() {
  const { addToCart } = useCart();
  const [successIds, setSuccessIds] = useState<number[]>([]);
  const [wishlistIds, setWishlistIds] = useState<number[]>([]);

  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as LocationState | null;

  const handleAddToWishlist = async (itemId: number) => {
    const userId = localStorage.getItem("userToken") || "";
    if (!userId) {
      alert("Veuillez vous connecter pour ajouter à la liste de souhaits.");
      return;
    }

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

  const handleAddToCart = async (product: SearchResultItem) => {
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
        }, 2000);
      }
    } catch (err) {
      console.error("Erreur panier:", err);
    }
  };

  if (!state || !state.results) {
    return (
      <div className="p-4">
        <p>No results found. Please search again.</p>
        <button
          onClick={() => navigate("/")}
          className="bg-gray-600 text-white px-4 py-2 mt-2 rounded"
        >
          Back
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="shop-product-fillter">
        <div className="totall-product">
          <p>
            {" "}
            Nous avons trouvé{" "}
            <strong className="text-brand">{state.results.length}</strong>{" "}
            articles pour <strong className="text-brand">{state.query}</strong>{" "}
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
      {state.results.map((product, index) => (
        <div className="col-lg-4 col-md-4 col-sm-6 col-xs-6" key={index}>
          <div className="product-cart-wrap mb-30">
            <div className="product-img-action-wrap">
              <div className="product-img product-img-zoom">
                <NavLink to={"/#"}>
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

                <button
                  className="action-btn hover-up loaderbtn-"
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
              {/* End of price and cart */}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default SearchResults;
