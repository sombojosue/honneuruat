import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  phoneNumber,
  email,
  facebookurl,
  twitterurl,
  instagramurl,
  youtubeurl,
} from "./Variables";
import logoOne from "../assets/imgs/theme/logoone.png";
import heartShopping from "../assets/imgs/theme/icons/icon-heart.svg";
import cartShopping from "../assets/imgs/theme/icons/icon-cart.svg";
import logo from "../assets/imgs/theme/logo.svg";

import facebook from "../assets/imgs/icons/facebook.png";
import instagram from "../assets/imgs/icons/instagram.png";
import youtube from "../assets/imgs/icons/youtube.png";
import twitter from "../assets/imgs/icons/twitter.png";
import Modal from "./Modal.tsx";
import axios from "axios";
import "../assets/css/main.css";

function Menu() {
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleCategory, setIsVisibleCategory] = useState(false);
  const [isVisibleCategoryMobile, setIsVisibleCategoryMobile] = useState(false);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  let userName = localStorage.getItem("userName");
  let imgprofile = localStorage.getItem("userAvatar");
  //Search handle data
  //Handle category change box

  const handleChangeCategory = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCategory(event.target.value);
  };
  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //Checking if user did not select the category option

    let urlapi = "";
    if (category == "") {
      urlapi = `https://inovsell.com/productsearch.php?query=${query}`;
    } else {
      urlapi = `https://inovsell.com/productsearch.php?query=${query}&category=${category}`;
    }

    // Example API call — replace this URL with your real endpoint
    const response = await fetch(urlapi);
    const data = await response.json();

    // Pass data through navigation state
    navigate("/Search", { state: { results: data, query, category } });
  };

  type Subcategory = {
    Category_id: number;
    Category_Name: string;
  };

  const [categoryList, setCategoryList] = useState<Subcategory[]>([]);
  //const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategoryList = async () => {
      try {
        const response = await axios.get<Subcategory[]>(
          `https://inovsell.com/productcategorylist.php`
        );
        setCategoryList(response.data);
        //   console.log("same category " + response.data);
      } catch (err) {
        //setError("Failed to fetch samecategories" + err);
      } finally {
        //setLoading(false);
      }
    };

    fetchCategoryList();
  });

  return (
    <>
      <header className="header-area header-style-3 header-height-2">
        <div className="header-top header-top-ptb-1 d-none d-lg-block">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xl-6 col-lg-4">
                <div className="header-info">
                  <ul>
                    <li>
                      <i className="fi-rs-smartphone"></i>{" "}
                      <a href={"tel:" + phoneNumber}>{phoneNumber}</a>
                    </li>
                    <li>
                      <i className="fi-rs-envelope"></i>
                      <a href={"mailto:" + email}>{email}</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4">
                <div className="text-center">
                  <div id="news-flash" className="d-inline-block">
                    <ul>
                      <li></li>
                      <li></li>
                      <li></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4">
                <div className="header-info header-info-right">
                  <ul>
                    <li>
                      <a href="#">
                        {" "}
                        <i className="fi-rs-world"></i> Français{" "}
                      </a>
                    </li>
                    <li>
                      {userName ? (
                        <>
                          <img
                            src={imgprofile || "assets/imgs/profile.png"}
                            alt="Profil"
                            style={{
                              width: "30px",
                              height: "30px",
                              marginRight: "5px",
                            }}
                          />

                          <NavLink to="/App">{userName}</NavLink>
                        </>
                      ) : (
                        <>
                          <i className="fi-rs-user"></i>
                          <a
                            href="#"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          >
                            Compte
                          </a>
                        </>
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="header-middle header-middle-ptb-1 d-none d-lg-block">
          <div className="container">
            <div className="header-wrap">
              <div className="logo logo-width-1">
                <a href="./">
                  <img src={logoOne} alt="logo" />
                </a>
              </div>
              <div className="header-right">
                <div className="search-style-2">
                  <form onSubmit={handleSearch}>
                    <select
                      className="select-active"
                      name="category"
                      value={category}
                      onChange={handleChangeCategory}
                    >
                      <option>Catégories</option>
                      {categoryList.map((productdata, index) => (
                        <option value={productdata.Category_Name} key={index}>
                          {productdata.Category_Name}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      name="itemsearch"
                      placeholder="Cherche ici..."
                      value={query}
                      autoComplete="off"
                      onChange={(e) => setQuery(e.target.value)}
                    />
                  </form>
                </div>
                <div className="header-action-right">
                  <div className="header-action-2">
                    <div className="header-action-icon-2">
                      <NavLink to="/Whitelist">
                        <img
                          className="svgInject"
                          alt="Evara"
                          src={heartShopping}
                        />
                      </NavLink>
                    </div>
                    <div className="header-action-icon-2">
                      <NavLink to="/Cart" className="mini-cart-icon">
                        <img alt="Evara" src={cartShopping} />
                        <span className="pro-count blue" id="cartCountone">
                          0
                        </span>
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="header-bottom header-bottom-bg-color sticky-bar">
          <div className="container">
            <div className="header-wrap header-space-between position-relative  main-nav">
              <div className="logo logo-width-1 d-block d-lg-none">
                <a href="./">
                  <img src={logo} alt="logo" />
                </a>
              </div>
              <div className="header-nav d-none d-lg-flex">
                <div className="main-categori-wrap d-none d-lg-block">
                  <a
                    className="categori-button-active"
                    onClick={() => {
                      setIsVisibleCategory(!isVisibleCategory);
                    }}
                  >
                    <span className="fi-rs-apps"></span>Catégories
                  </a>
                  <div
                    className={
                      isVisibleCategory
                        ? "categori-dropdown-wrap categori-dropdown-active-large open"
                        : "categori-dropdown-wrap categori-dropdown-active-large"
                    }
                  >
                    <ul>
                      {categoryList.map((productdata) => (
                        <li key={productdata.Category_id}>
                          <NavLink
                            to={"/Categorytype?q=" + productdata.Category_Name}
                          >
                            {productdata.Category_Name}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="main-menu main-menu-padding-1 main-menu-lh-2 d-none d-lg-block">
                  <nav>
                    <ul>
                      <li>
                        <NavLink
                          to="/"
                          end
                          className={({ isActive }) =>
                            isActive ? "active" : ""
                          }
                        >
                          Accueil
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/about"
                          end
                          className={({ isActive }) =>
                            isActive ? "active" : ""
                          }
                        >
                          A propos
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/shop"
                          end
                          className={({ isActive }) =>
                            isActive ? "active" : ""
                          }
                        >
                          Shop{" "}
                        </NavLink>
                      </li>

                      <li>
                        <NavLink
                          to="/contact"
                          end
                          className={({ isActive }) =>
                            isActive ? "active" : ""
                          }
                        >
                          Contact
                        </NavLink>
                      </li>

                      <li>
                        {userName ? (
                          <NavLink
                            to="/App"
                            end
                            className={({ isActive }) =>
                              isActive ? "active" : ""
                            }
                          >
                            Profile
                          </NavLink>
                        ) : (
                          <a
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          >
                            Compte
                          </a>
                        )}
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
              <div className="hotline d-none d-lg-block">
                <p>
                  <i className="fi-rs-headset"></i>
                  <span>Assistance </span> 24h/24{" "}
                </p>
              </div>

              <div className="header-action-right d-block d-lg-none">
                <div className="header-action-2">
                  <div className="header-action-icon-2">
                    <NavLink to="/Whitelist">
                      <img alt="Evara" src={heartShopping} />
                    </NavLink>
                  </div>
                  <div className="header-action-icon-2">
                    <NavLink to="/Cart" className="mini-cart-icon">
                      <img alt="Evara" src={cartShopping} />
                      <span className="pro-count white" id="cartCounttwo">
                        0
                      </span>
                    </NavLink>
                  </div>
                  <div
                    className="header-action-icon-2 d-block d-lg-none"
                    onClick={() => setIsVisible(!isVisible)}
                  >
                    <div className="burger-icon burger-icon-white">
                      <span className="burger-icon-top"></span>
                      <span className="burger-icon-mid"></span>
                      <span className="burger-icon-bottom"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div
        className={
          isVisible
            ? "mobile-header-active mobile-header-wrapper-style sidebar-visible"
            : "mobile-header-active mobile-header-wrapper-style"
        }
      >
        <div className="mobile-header-wrapper-inner">
          <div className="mobile-header-top">
            <div className="mobile-header-logo">
              <a href="./">
                <img src={logo} alt="logo" />
              </a>
            </div>
            <div className="mobile-menu-close close-style-wrap close-style-position-inherit">
              <button
                className="close-style search-close"
                onClick={() => setIsVisible(!isVisible)}
              >
                <i className="icon-top"></i>
                <i className="icon-bottom"></i>
              </button>
            </div>
          </div>
          <div className="mobile-header-content-area">
            <div className="mobile-search search-style-3 mobile-header-border">
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  name="itemsearch"
                  placeholder="Cherche ici..."
                  value={query}
                  autoComplete="off"
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit">
                  <i className="fi-rs-search"></i>
                </button>
              </form>
            </div>
            <div className="mobile-menu-wrap mobile-header-border">
              <div className="main-categori-wrap mobile-header-border">
                <a
                  className="categori-button-active-2"
                  onClick={() => {
                    setIsVisibleCategoryMobile(!isVisibleCategoryMobile);
                  }}
                >
                  <span className="fi-rs-apps"></span>Catégories
                </a>
                <div
                  className={
                    isVisibleCategoryMobile
                      ? "categori-dropdown-wrap categori-dropdown-active-large open static"
                      : "categori-dropdown-wrap categori-dropdown-active-large"
                  }
                >
                  <ul>
                    {categoryList.map((productdata) => (
                      <li key={productdata.Category_id}>
                        <NavLink
                          to={"/Categorytype?q=" + productdata.Category_Name}
                        >
                          {productdata.Category_Name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <nav>
                <ul className="mobile-menu">
                  <li>
                    <span className="menu-expand"></span>
                    <NavLink
                      to="/"
                      end
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      Accueil
                    </NavLink>
                  </li>
                  <li>
                    <span className="menu-expand"></span>
                    <NavLink
                      to="/about"
                      end
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      A propos
                    </NavLink>
                  </li>

                  <li>
                    <span className="menu-expand"></span>
                    <NavLink
                      to="/shop"
                      end
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      Shop
                    </NavLink>
                  </li>

                  <li>
                    <span className="menu-expand"></span>
                    <NavLink
                      to="/contact"
                      end
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      Contact
                    </NavLink>
                  </li>

                  <li>
                    <span className="menu-expand"></span>

                    {userName ? (
                      <NavLink
                        to="/App"
                        end
                        className={({ isActive }) => (isActive ? "active" : "")}
                      >
                        Profile
                      </NavLink>
                    ) : (
                      <a data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Compte
                      </a>
                    )}
                  </li>
                </ul>
              </nav>
            </div>
            <div className="mobile-header-info-wrap mobile-header-border"></div>
            <div className="mobile-social-icon">
              <h5 className="mb-15 text-grey-4">Suivez-nous</h5>
              <a href={facebookurl}>
                <img src={facebook} alt="facebook" />
              </a>
              <a href={twitterurl}>
                <img src={twitter} alt="twitter" width={24} height={24} />
              </a>
              <a href={instagramurl}>
                <img src={instagram} alt="instagram" width={24} height={24} />
              </a>

              <a href={youtubeurl}>
                <img src={youtube} alt="youtube" width={24} height={24} />
              </a>
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

export default Menu;
