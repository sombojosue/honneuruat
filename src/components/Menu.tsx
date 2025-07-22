import { useState, useEffect } from "react";
import { useCart } from "./CartContext";
import { NavLink, useNavigate } from "react-router-dom";
import {
  phoneNumber,
  email,
  facebookurl,
  twitterurl,
  instagramurl,
  linkedinurl,
  tiktokurl,
  urlAppApi,
} from "./Variables";
import logoOne from "../assets/imgs/theme/logoone.png";
import heartShopping from "../assets/imgs/theme/icons/icon-heart.svg";
import cartShopping from "../assets/imgs/theme/icons/icon-cart.svg";
import logo from "../assets/imgs/theme/logo.svg";
import Modal from "./Modal.tsx";
import axios from "axios";
import "../assets/css/main.css";

function Menu() {
  const { totalItems } = useCart();

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
      urlapi = `${urlAppApi}productsearch.php?query=${query}`;
    } else {
      urlapi = `${urlAppApi}productsearch.php?query=${query}&category=${category}`;
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
          `${urlAppApi}productcategorylist.php`
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
                            className="rounded-circle"
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
                      <NavLink to="/Wishlist">
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
                        <span className="pro-count blue">{totalItems}</span>
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
                    <span className="fi-rs-apps"></span>Services
                  </a>
                  <div
                    className={
                      isVisibleCategory
                        ? "categori-dropdown-wrap categori-dropdown-active-large open"
                        : "categori-dropdown-wrap categori-dropdown-active-large"
                    }
                  >
                    <ul>
                      <li>
                        <NavLink to="/Collection">Collections</NavLink>
                      </li>
                      <li>
                        <NavLink to="/Reservation">Réservation</NavLink>
                      </li>
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
                          to="/reservation"
                          end
                          className={({ isActive }) =>
                            isActive ? "active" : ""
                          }
                        >
                          Réservation
                        </NavLink>
                      </li>

                      <li>
                        <NavLink
                          to="/collections"
                          end
                          className={({ isActive }) =>
                            isActive ? "active" : ""
                          }
                        >
                          Nos Collections{" "}
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
                    <NavLink to="/Wishlist">
                      <img alt="Evara" src={heartShopping} />
                    </NavLink>
                  </div>
                  <div className="header-action-icon-2">
                    <NavLink to="/Cart" className="mini-cart-icon">
                      <img alt="Evara" src={cartShopping} />
                      <span className="pro-count white">{totalItems}</span>
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
                  <span className="fi-rs-apps"></span>Services
                </a>
                <div
                  className={
                    isVisibleCategoryMobile
                      ? "categori-dropdown-wrap categori-dropdown-active-large open static"
                      : "categori-dropdown-wrap categori-dropdown-active-large"
                  }
                >
                  <ul>
                    <li>
                      <NavLink to="/Collections">Collections</NavLink>
                    </li>
                    <li>
                      <NavLink to="/Reservation">Réservation</NavLink>
                    </li>
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
                      to="/reservation"
                      end
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      Réservation
                    </NavLink>
                  </li>

                  <li>
                    <span className="menu-expand"></span>
                    <NavLink
                      to="/Collections"
                      end
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      Nos Collections
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
                </ul>
              </nav>
            </div>
            <div className="mobile-header-info-wrap mobile-header-border"></div>
            <div className="mobile-social-icon">
              <h5 className="mb-15 text-grey-4">Suivez-nous</h5>
              <a href={facebookurl} target="_blank" rel="noopener noreferrer">
                <svg
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-3h2.5V9.5c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4H15.8c-1.2 0-1.6.7-1.6 1.5V12h2.7l-.4 3h-2.3v7A10 10 0 0 0 22 12z" />
                </svg>
              </a>

              <a href={twitterurl} target="_blank" rel="noopener noreferrer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.53 3H21L14.42 10.34L22.24 21H15.5L10.75 14.8L5.25 21H2L9.06 13.12L1.52 3H8.41L12.72 8.68L17.53 3ZM16.3 19H18.1L7.8 4.89H5.84L16.3 19Z" />
                </svg>
              </a>

              <a href={instagramurl} target="_blank" rel="noopener noreferrer">
                <svg
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9zm4.5 3a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11zm0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5-1a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg>
              </a>

              <a
                href={linkedinurl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.45 20.45h-3.55v-5.4c0-1.29-.02-2.94-1.79-2.94-1.8 0-2.08 1.4-2.08 2.84v5.5H9.48V9h3.41v1.56h.05c.48-.9 1.66-1.84 3.42-1.84 3.66 0 4.34 2.41 4.34 5.54v6.19zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM6.97 20.45H3.7V9h3.27v11.45zM22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.23 0z" />
                </svg>
              </a>

              <a href={tiktokurl} target="_blank" rel="noopener noreferrer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 256 256"
                  fill="currentColor"
                >
                  <path
                    d="M160 32c0 17.673 14.327 32 32 32 6.081 0 11.753-1.715 16.529-4.673v33.27a65.5 65.5 0 01-48.529-14.04v89.657a65.5 65.5 0 11-65.5-65.5c2.671 0 5.29.183 7.849.527v33.694a32 32 0 1032 32V32h25.651Z"
                    fill="#465b52"
                  />
                </svg>
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
