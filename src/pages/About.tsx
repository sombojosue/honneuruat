import Menu from "../components/Menu.tsx";
import Footer from "../components/Footer.tsx";
import { aboutUs } from "../components/Variables";
import aboutImg from "../assets/imgs/banner/about.jpg";

function Contact() {
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
              <span></span> A propos
            </div>
          </div>
        </div>

        <section className="section-padding">
          <div className="container pt-25">
            <div className="row">
              <div className="col-lg-6 align-self-center mb-lg-0 mb-4">
                <h6 className="mt-0 mb-15 text-uppercase font-sm text-brand wow fadeIn animated">
                  A propos de nous
                </h6>
                {aboutUs}
              </div>
              <div className="col-lg-6">
                <img src={aboutImg} alt="about image" />
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}

export default Contact;
