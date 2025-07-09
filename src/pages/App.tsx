import { CartProvider } from "../components/CartContext.tsx";
import Menu from "../components/Menu.tsx";
import Footer from "../components/Footer.tsx";
import ScrollToTop from "../components/ScrollToTop.tsx";
import Profile from "../components/Profile.tsx";
// pages/Home.tsx

function App() {
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
                <span></span> Profile
              </div>
            </div>
          </div>

          <section className="section-padding">
            <div className="container pt-25">
              <div className="row">
                <div className="col-lg-12 align-self-center mb-lg-0 mb-4">
                  <Profile />
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

export default App;
