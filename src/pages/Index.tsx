import Menu from "../components/Menu.tsx";
import Banner from "../components/Banner.tsx";
import Footer from "../components/Footer.tsx";
import Pub from "../components/Pub.tsx";
import Product from "../components/Product.tsx";

function Index() {
  return (
    <>
      <Menu />
      <main className="main">
        <Banner />
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
                    Nouvel article
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
                    Nos meilleur produits
                  </button>
                </li>
              </ul>
            </div>
            <div className="row product-grid-4">
              <Product />
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}

export default Index;
