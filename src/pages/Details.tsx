import { CartProvider } from "../components/CartContext.tsx";
import Menu from "../components/Menu.tsx";
import Footer from "../components/Footer.tsx";
import DetailsData from "../components/DetailsData.tsx";
import ScrollToTop from "../components/ScrollToTop.tsx";

function Details() {
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
                <span></span> Détails
              </div>
            </div>
          </div>
          <DetailsData />
          <Footer />
        </main>
      </CartProvider>
    </>
  );
}

export default Details;
