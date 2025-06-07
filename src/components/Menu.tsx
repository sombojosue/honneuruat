import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../assets/css/main.css";
import { phoneNumber, email } from "./Variables";
import flagImg from "../assets/imgs/theme/flag-en.png";
import logoOne from "../assets/imgs/theme/logoone.png";
import heartShopping from "../assets/imgs/theme/icons/icon-heart.svg";
import cartShopping from "../assets/imgs/theme/icons/icon-cart.svg";
import logo from "../assets/imgs/theme/logo.svg";
import facebook from "../assets/imgs/theme/icons/icon-facebook.svg";
import twitter from "../assets/imgs/theme/icons/icon-twitter.svg";
import instagram from "../assets/imgs/theme/icons/icon-instagram.svg";
import youtube from "../assets/imgs/theme/icons/icon-youtube.svg";

//import "../App.css";

function Menu() {
  //false class = "mobile-header-active mobile-header-wrapper-style"
  //True class = "mobile-header-active mobile-header-wrapper-style sidebar-visible"
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleCategory, setIsVisibleCategory] = useState(false);
  const [isVisibleCategoryMobile, setIsVisibleCategoryMobile] = useState(false);
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
                      <a className="language-dropdown-active" href="#">
                        {" "}
                        <i className="fi-rs-world"></i> Français{" "}
                        <i className="fi-rs-angle-small-down"></i>
                      </a>

                      <ul className="language-dropdown">
                        <li>
                          <a href="#">
                            <img src={flagImg} alt="flag" />
                            Anglais
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <i className="fi-rs-user"></i>
                      <a href="app.php">user login</a>
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
                  <form action="search.php">
                    <select className="select-active" name="category">
                      <option>Catégories</option>

                      <option value=""></option>
                    </select>
                    <input
                      type="text"
                      name="itemsearch"
                      placeholder="Cherche ici..."
                    />
                  </form>
                </div>
                <div className="header-action-right">
                  <div className="header-action-2">
                    <div className="header-action-icon-2">
                      <a href="wishlist.php">
                        <img
                          className="svgInject"
                          alt="Evara"
                          src={heartShopping}
                        />
                      </a>
                    </div>
                    <div className="header-action-icon-2">
                      <a className="mini-cart-icon" href="cart.php">
                        <img alt="Evara" src={cartShopping} />
                        <span className="pro-count blue" id="cartCountone">
                          0
                        </span>
                      </a>
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
                      <li>
                        <NavLink to="/categorytype?shop">
                          <i className="fi-rs-angle-right"></i>Shop
                        </NavLink>
                        <NavLink to="/categorytype?Shoes">
                          <i className="fi-rs-angle-right"></i>Shoes
                        </NavLink>
                        <NavLink to="/categorytype?Mobile">
                          <i className="fi-rs-angle-right"></i>Mobile
                        </NavLink>
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
                        <NavLink
                          to="/app"
                          end
                          className={({ isActive }) =>
                            isActive ? "active" : ""
                          }
                        >
                          Compte
                        </NavLink>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
              <div className="hotline d-none d-lg-block">
                <p>
                  <i className="fi-rs-headset"></i>
                  <span>Hotline</span> 1900 - 888{" "}
                </p>
              </div>

              <div className="header-action-right d-block d-lg-none">
                <div className="header-action-2">
                  <div className="header-action-icon-2">
                    <a href="./">
                      <img alt="Evara" src={heartShopping} />
                    </a>
                  </div>
                  <div className="header-action-icon-2">
                    <a className="mini-cart-icon" href="shop-cart.html">
                      <img alt="Evara" src={cartShopping} />
                      <span className="pro-count white" id="cartCounttwo">
                        0
                      </span>
                    </a>
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
              <form action="search">
                <input
                  type="text"
                  name="itemsearch"
                  placeholder="Cherche ici..."
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
                    <li>
                      <NavLink
                        to="/categorytype?shop"
                        end
                        className={({ isActive }) => (isActive ? "active" : "")}
                      >
                        <i className="fi-rs-angle-right"></i>Shop
                      </NavLink>
                      <NavLink
                        to="/categorytype?Shoes"
                        end
                        className={({ isActive }) => (isActive ? "active" : "")}
                      >
                        <i className="fi-rs-angle-right"></i>Shoes
                      </NavLink>
                      <NavLink
                        to="/categorytype?Mobile"
                        end
                        className={({ isActive }) => (isActive ? "active" : "")}
                      >
                        <i className="fi-rs-angle-right"></i>Mobile
                      </NavLink>
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
                      to="/app"
                      end
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      Compte
                    </NavLink>
                  </li>

                  <li className="menu-item-has-children">
                    <span className="menu-expand"></span>
                    <a href="#">Langue</a>
                    <ul className="dropdown">
                      <li>
                        <NavLink to="/">French</NavLink>
                      </li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="mobile-header-info-wrap mobile-header-border">
              <div className="single-mobile-header-info mt-30">
                <NavLink
                  to="/contact"
                  end
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Localisation{" "}
                </NavLink>
              </div>
              <div className="single-mobile-header-info">
                <NavLink
                  to="app"
                  end
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Compte{" "}
                </NavLink>
              </div>
              <div className="single-mobile-header-info">
                <a href={"tel:" + phoneNumber}>{phoneNumber}</a>
              </div>
            </div>
            <div className="mobile-social-icon">
              <h5 className="mb-15 text-grey-4">Suivez-nous</h5>
              <a href="#">
                <img src={facebook} alt="" />
              </a>
              <a href="#">
                <img src={twitter} alt="" />
              </a>
              <a href="#">
                <img src={instagram} alt="" />
              </a>

              <a href="#">
                <img src={youtube} alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Menu;
