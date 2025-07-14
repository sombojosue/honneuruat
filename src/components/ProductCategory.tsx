import { useEffect, useState } from "react";
import { useCart } from "./CartContext";
import "../assets/css/main.css";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { urlApp } from "./Variables";
import ProductLoader from "./ProductLoader";
import { addToWishlist } from "./AddToWishlist.tsx";

type Subcategory = {
  Product_name: string;
  Picture: string;
  Price: number;
  Category_name: string;
  Product_id: number;
};

const sanitizeInput = (input: string): string => {
  return input
    .trim() // Trim first to avoid issues with space removal
    .replace(/[^a-zA-Z0-9@._-]/g, "") // Only allow alphanum, @, ., _, -
    .replace(/@{2,}/g, "@") // Replace multiple @ with a single one
    .replace(/\.{2,}/g, "."); // Replace multiple dots with a single one
};

const ProductCategory: React.FC = () => {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("q");
  const { addToCart } = useCart();
  const [successIds, setSuccessIds] = useState<number[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [wishlistIds, setWishlistIds] = useState<number[]>([]);
  const [visibleCount, setVisibleCount] = useState(12);
  const itemsPerPage = 12;

  useEffect(() => {
    if (!categoryId) {
      setError("Query ID not found in URL");
      setLoading(false);
      return;
    }

    const fetchSubcategories = async () => {
      try {
        const response = await axios.get<Subcategory[]>(
          `${urlApp}productcategory.php?query=${sanitizeInput(categoryId)}`
        );
        //If user try to inject query from the URL Page
        if (response.data[0] == undefined) {
          setError(
            "Veuillez ne pas tenter de manipuler l’adresse URL. Toute tentative de modification non autorisée pourra entraîner une interruption de votre session ou un blocage d’accès."
          );
        } else {
          setSubcategories(response.data);
        }
      } catch (err) {
        setError("Failed to fetch subcategories");
      } finally {
        setLoading(false);
      }
    };

    fetchSubcategories();
  }, [categoryId]);

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

  const handleAddToCart = async (product: Subcategory) => {
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
  if (error)
    return (
      <div className="container">
        <div className="row mt-3 mb-3">
          <div className="col-lg-12">
            <div className="alert alert-danger">
              <p>{error}</p>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <>
      <div className="shop-product-fillter">
        <div className="totall-product">
          <p>
            {" "}
            Nous avons trouvé{" "}
            <strong className="text-brand">{subcategories.length}</strong>{" "}
            articles pour <strong className="text-brand">{categoryId}</strong>
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
      {subcategories.slice(0, visibleCount).map((product, index) => (
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
                    alt="Item images"
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
      {visibleCount < subcategories.length && (
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

export default ProductCategory;
