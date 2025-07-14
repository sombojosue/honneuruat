import { CartProvider } from "../components/CartContext.tsx";
import Menu from "../components/Menu.tsx";
import Banner from "../components/Banner.tsx";
import Footer from "../components/Footer.tsx";
import Pub from "../components/Pub.tsx";
import Product from "../components/Product.tsx";
import ScrollToTop from "../components/ScrollToTop.tsx";
import ReservationProduct from "../components/ReservationProduct.tsx";

function Index() {
  return (
    <>
      <ScrollToTop />
      <CartProvider>
        <Menu />
        <main className="main">
          <div className="container">
            <div className="row my-3">
              <Banner />
            </div>
          </div>

          <section className="product-tabs section-padding wow fadeIn animated">
            <div className="container">
              <div className="tab-header">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="nav-tab-one"
                      data-bs-toggle="tab"
                      data-bs-target="#tab-one"
                      type="button"
                      role="tab"
                      aria-controls="tab-one"
                      aria-selected="true"
                    >
                      Nos articles
                    </button>
                  </li>
                </ul>
              </div>
              <div className="row product-grid-4">
                <Product />
              </div>
            </div>
          </section>
          <Pub />
          <section className="product-tabs section-padding wow fadeIn animated">
            <div className="container">
              <div className="tab-header">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="nav-tab-one"
                      data-bs-toggle="tab"
                      data-bs-target="#tab-one"
                      type="button"
                      role="tab"
                      aria-controls="tab-one"
                      aria-selected="true"
                    >
                      Nos réservations
                    </button>
                  </li>
                </ul>
              </div>
              <div className="row product-grid-4">
                <ReservationProduct />
              </div>
            </div>
          </section>
          <Footer />
        </main>
      </CartProvider>
    </>
  );
}

export default Index;
