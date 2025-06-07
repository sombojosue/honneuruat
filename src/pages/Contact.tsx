import Menu from "../components/Menu.tsx";
import Footer from "../components/Footer.tsx";

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
              <span></span> Contact
            </div>
          </div>
        </div>

        <section className="pt-50 pb-50">
          <div className="container">
            <div className="row">
              <div className="col-xl-8 col-lg-10 m-auto">
                <div className="contact-from-area padding-20-row-col wow FadeInUp">
                  <h3 className="mb-10 text-center">Écrivez-nous</h3>
                  <p className="text-muted mb-30 text-center font-sm">
                    Entrer en contact avec nous.
                  </p>
                  <form
                    className="contact-form-style text-center"
                    id="contact"
                    method="post"
                  >
                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        <div className="input-style mb-20">
                          <input
                            name="name"
                            placeholder="Nom"
                            id="name"
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="input-style mb-20">
                          <input
                            name="email"
                            placeholder="Email"
                            id="emailfrm"
                            type="email"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="input-style mb-20">
                          <input
                            name="phone"
                            placeholder="Téléphone  ex.+243820988188"
                            id="phone"
                            type="tel"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="input-style mb-20">
                          <input
                            name="subject"
                            placeholder="Sujet"
                            id="topic"
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12">
                        <span id="buttonone"></span>
                        <div className="textarea-style mb-30">
                          <textarea
                            name="message"
                            placeholder="Message"
                            id="message"
                          ></textarea>
                        </div>

                        <button
                          className="submit submit-auto-width"
                          id="button"
                          type="submit"
                        >
                          <span id="textContact">Envoyer</span>
                          <div className="sprinloader" id="spinContact"></div>
                        </button>
                      </div>
                    </div>
                  </form>
                  <br />
                  <div
                    className="alert alert-success"
                    style={{ display: "none" }}
                    id="successMsg"
                  ></div>

                  <div
                    className="alert alert-danger"
                    style={{ display: "none" }}
                    id="dangerMsg"
                  ></div>
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

export default Contact;
