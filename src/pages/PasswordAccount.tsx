import Menu from "../components/Menu.tsx";
import Footer from "../components/Footer.tsx";
import ScrollToTop from "../components/ScrollToTop.tsx";
import PasswordAccountSet from "../components/PasswordAccountSet.tsx";
// pages/Home.tsx

function PasswordAccount() {
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
              <span></span> Profile
            </div>
          </div>
        </div>

        <section className="section-padding">
          <div className="container pt-25">
            <div className="row">
              <div className="col-lg-12 align-self-center mb-lg-0 mb-4">
                <PasswordAccountSet />
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}

export default PasswordAccount;
