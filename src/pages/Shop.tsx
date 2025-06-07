import Menu from "../components/Menu.tsx";
import Footer from "../components/Footer.tsx";
import { NavLink } from "react-router-dom";
import ShopProduct from "../components/ShopProduct.tsx";

function Shop() {
  return (
    <>
      <Menu />
      <main className="main">
        <div className="page-header breadcrumb-wrap">
          <div className="container">
            <div className="breadcrumb">
              <a href="./" rel="nofollow">
                Accueil
              </a>
              <span></span> Shop
            </div>
          </div>
        </div>

        <section className="mt-50 mb-50">
          <div className="container">
            <div className="row">
              <div className="col-lg-9">
                <div className="shop-product-fillter">
                  <div className="totall-product">
                    <p>
                      {" "}
                      Nous avons trouvé{" "}
                      <strong className="text-brand">10</strong> articles pour
                      vous !{" "}
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
                            <a href="sorted.php?order=priceasc">
                              Prix: De bas en haut
                            </a>
                          </li>
                          <li>
                            <a href="sorted.php?order=pricedesc">
                              Prix: De haut en bas
                            </a>
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
                  <ShopProduct />
                </div>
              </div>
              <div className="col-lg-3 primary-sidebar sticky-sidebar">
                <div className="row">
                  <div className="col-lg-12 col-mg-6"></div>
                  <div className="col-lg-12 col-mg-6"></div>
                </div>
                <div className="widget-category mb-30">
                  <h5 className="section-title style-1 mb-30 wow fadeIn animated">
                    Catégories
                  </h5>
                  <ul className="categories">
                    <li>
                      <NavLink to="/categorytype?shop">Shop</NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}

export default Shop;
