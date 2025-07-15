import { useState } from "react";
import { CartProvider } from "../components/CartContext.tsx";
import Menu from "../components/Menu.tsx";
import Footer from "../components/Footer.tsx";
import ScrollToTop from "../components/ScrollToTop.tsx";
import { urlApp } from "../components/Variables";

function Contact() {
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [messageSuccess, setmessageSuccess] = useState("");
  const [messageBox, setMessageBox] = useState("");
  const [btnOpacity, setBtnOpacity] = useState(true);

  const handleContact = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      email == "" ||
      subject == "" ||
      phone == "" ||
      name == "" ||
      messageBox == ""
    ) {
      setMessage("Veuillez remplir tous les champs.");
      return false;
    }

    setBtnOpacity(false);

    try {
      const response = await fetch(`${urlApp}productcontact.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          email,
          subject,
          name,
          phone,
          messageBox,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setmessageSuccess(
          "✅ Merci ! Votre message a bien été envoyé. Nous vous répondrons dans les plus brefs délais."
        );
        setSubject("");
        setEmail("");
        setName("");
        setPhone("");
        setMessageBox("");
      } else {
        setBtnOpacity(true);

        if (result.message == "Traitement de mail") {
          setMessage(
            "Votre message est en cours de traitement, nous vous répondrons dans les plus brefs délais."
          );
        }

        if (result.message == "Invalid empty name") {
          setMessage("Le nom ne peut pas être vide.");
        }
        if (result.message == "Invalid empty subject") {
          setMessage("Le sujet ne peut pas être vide.");
        }

        if (result.message == "Invalid empty email") {
          setMessage("L'email ne peut pas être vide.");
        }

        if (result.message == "Invalid empty message") {
          setMessage("Message ne peut pas être vide.");
        }

        if (result.message == "Invalid empty phone") {
          setMessage("Le numéro de téléphone ne peut pas être vide.");
        }

        if (result.message == "Invalid email") {
          setMessage("Veuillez saisir une adresse e-mail valide.");
        }
        if (result.message == "Invalid phone") {
          setMessage("Veuillez saisir un numéro de téléphone valide.");
        }

        if (result.message == "Invalid name") {
          setMessage("Le nom ne doit contenir que des lettres et des espaces.");
        }

        console.log(result.message + " " + result.success);
      }
    } catch (error) {
      setMessage(
        "Impossible d'établir une connexion avec le serveur. Veuillez réessayer plus tard."
      );
      console.error("Login error:", error);
      setBtnOpacity(true);
    }
  };

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
                      onSubmit={handleContact}
                    >
                      <div className="row">
                        <div className="col-lg-6 col-md-6">
                          <div className="input-style mb-20">
                            <input
                              name="name"
                              placeholder="Nom"
                              id="name"
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
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
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="input-style mb-20">
                            <input
                              name="phone"
                              placeholder="Téléphone  ex.0810958187"
                              id="phone"
                              type="tel"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
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
                              value={subject}
                              onChange={(e) => setSubject(e.target.value)}
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
                              value={messageBox}
                              onChange={(e) => setMessageBox(e.target.value)}
                            ></textarea>
                          </div>

                          {btnOpacity ? (
                            <button
                              className="submit submit-auto-width"
                              id="button"
                              type="submit"
                            >
                              <span id="textContact">Envoyer</span>
                            </button>
                          ) : (
                            <button
                              className="btn"
                              id="button"
                              type="submit"
                              disabled
                            >
                              <span id="textContact">Envoyer</span>
                            </button>
                          )}
                        </div>
                      </div>
                      {message && (
                        <div className="alert alert-danger mt-1" role="alert">
                          {message}
                        </div>
                      )}
                      {messageSuccess && (
                        <div className="alert alert-success mt-1" role="alert">
                          {messageSuccess}
                        </div>
                      )}
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
      </CartProvider>
    </>
  );
}

export default Contact;
