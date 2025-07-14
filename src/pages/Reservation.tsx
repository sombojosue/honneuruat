import { useEffect, useState } from "react";
import { CartProvider } from "../components/CartContext.tsx";
import Menu from "../components/Menu.tsx";
import Footer from "../components/Footer.tsx";
import { NavLink } from "react-router-dom";
import axios from "axios";
import ScrollToTop from "../components/ScrollToTop.tsx";
import { urlApp } from "../components/Variables.tsx";
import ReservationProductList from "../components/ReservationProductList.tsx";

function Shop() {
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
          `${urlApp}productcategorylist.php`
        );
        setCategoryList(response.data);
        console.log("same category " + response.data);
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
      <ScrollToTop />
      <CartProvider>
        <Menu />
        <main className="main">
          <div className="page-header breadcrumb-wrap">
            <div className="container">
              <div className="breadcrumb">
                <a href="./" rel="nofollow">
                  Accueil
                </a>
                <span></span> Réservation
              </div>
            </div>
          </div>

          <section className="mt-50 mb-50">
            <div className="container">
              <div className="row">
                <div className="col-lg-9">
                  <div className="row product-grid-3">
                    <ReservationProductList />
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
              </div>
            </div>
          </section>

          <Footer />
        </main>
      </CartProvider>
    </>
  );
}

export default Shop;
