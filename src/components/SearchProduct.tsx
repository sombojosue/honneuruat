import { useLocation, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "../assets/css/main.css";
import { urlApp } from "./Variables";

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
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as LocationState | null;

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
                <a
                  href=""
                  aria-label="aperçu rapide"
                  className="action-btn hover-up"
                >
                  <i className="fi-rs-eye"></i>
                </a>

                <button
                  aria-label="Ajouter a la Wishlist"
                  className="action-btn hover-up loaderbtn-"
                >
                  <i className="fi-rs-heart"></i>
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

              <br />

              <div className="product-price">
                <span>{product.Price}$</span>
              </div>

              <div className="product-action-1 show">
                <a
                  aria-label="Ajouter au panier"
                  className="action-btn hover-up"
                >
                  <i className="fi-rs-shopping-bag-add"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default SearchResults;
