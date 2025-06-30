import Menu from "../components/Menu.tsx";
import Footer from "../components/Footer.tsx";
import ScrollToTop from "../components/ScrollToTop.tsx";
import CartProduct from "../components/CartProduct.tsx";

function About() {
  return (
    <>
      <ScrollToTop />
      <Menu />
      <main className="main">
        <div className="page-header breadcrumb-wrap">
          <div className="container">
            <div className="breadcrumb">
              <a href="./" rel="nofollow">
                Accueil
              </a>
              <span></span> Cart
            </div>
          </div>
        </div>

        <CartProduct />
        <Footer />
      </main>
    </>
  );
}

export default About;
