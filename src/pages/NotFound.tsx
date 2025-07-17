import { CartProvider } from "../components/CartContext.tsx";
import Menu from "../components/Menu.tsx";
import Footer from "../components/Footer.tsx";
import avatar from "../assets/imgs/file.png";
import ScrollToTop from "../components/ScrollToTop.tsx";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

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
                <span></span> Page non trouvée.
              </div>
            </div>
          </div>

          <section className="section-padding">
            <div className="container pt-25 mt-50">
              <div className="row">
                <div className="col-lg-12 align-self-center mb-lg-0 mb-4">
                  <center>
                    <h6
                      className="mt-0 mb-15 text-uppercase font-sm text-brand wow fadeIn animated animated animated"
                      style={{ visibility: "visible" }}
                    >
                      404 Page introuvable
                    </h6>

                    <img
                      src={avatar}
                      alt="error 403 image"
                      style={{ height: "128px" }}
                    />
                    <p>
                      Désolé, le serveur ne trouve pas la ressource demandée.
                    </p>

                    <button
                      onClick={() => navigate("/")}
                      className="btn btn-sm mt-10"
                    >
                      Aller à l'accueil&nbsp;&#8594;
                    </button>
                  </center>
                </div>
              </div>
            </div>
          </section>

          <section className="section-padding">
            <div className="container pt-50 mb-80">
              <div className="row">
                <div className="col-lg-12 align-self-center mb-lg-0 mb-4"></div>
              </div>
            </div>
          </section>
          <Footer />
        </main>
      </CartProvider>
    </>
  );
}

export default NotFound;
