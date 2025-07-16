import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../assets/css/main.css";
import emailIcon from "../assets/imgs/theme/icons/email.svg";
import logo from "../assets/imgs/theme/logo.svg";
import {
  phoneNumber,
  email,
  address,
  copyRight,
  facebookurl,
  twitterurl,
  instagramurl,
  youtubeurl,
} from "./Variables";
import storeImg from "../assets/imgs/theme/app-store.jpg";
import appImg from "../assets/imgs/theme/payment-method.png";
import { urlApp } from "../components/Variables";

//import "../App.css";

function Footer() {
  const [emailBox, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [btnOpacity, setBtnOpacity] = useState(true);
  const [messageSuccess, setmessageSuccess] = useState("");

  const handleNews = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email == "") {
      setMessage("Veuillez remplir votre email.");
      return false;
    }

    setBtnOpacity(false);

    try {
      const response = await fetch(`${urlApp}productnews.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          emailBox,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setmessageSuccess(
          "✅ Merci ! Vous êtes maintenant abonné(e) à notre newsletter."
        );
        setMessage("");
        setEmail("");
      } else {
        setBtnOpacity(true);
        setmessageSuccess("");
        if (result.message == "Invalid empty email") {
          setMessage("L'email ne peut pas être vide.");
        }

        if (result.message == "Invalid email") {
          setMessage("Veuillez saisir une adresse e-mail valide.");
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
      <section className="newsletter p-30 text-white wow fadeIn animated bg">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7 mb-md-3 mb-lg-0">
              <div className="row align-items-center">
                <div className="col flex-horizontal-center">
                  <img className="icon-email" src={emailIcon} alt="" />
                  <h4
                    className="font-size-20 mb-0 ml-3"
                    style={{ color: "#fff !important" }}
                  >
                    Inscrivez-vous à la newsletter
                  </h4>

                  {message && (
                    <h4
                      className="alert alert-danger mt-3"
                      style={{ fontSize: "12px" }}
                    >
                      {message}
                    </h4>
                  )}
                  {messageSuccess && (
                    <h4
                      className="alert alert-success mt-3"
                      style={{ fontSize: "12px" }}
                    >
                      {messageSuccess}
                    </h4>
                  )}
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <form
                className="form-subcriber d-flex wow fadeIn animated"
                onSubmit={handleNews}
              >
                <input
                  type="email"
                  id="email"
                  className="form-control bg-white font-small"
                  placeholder="Entrer votre Email"
                  value={emailBox}
                  onChange={(e) => setEmail(e.target.value)}
                />

                {btnOpacity ? (
                  <button
                    className="btn bg-dark text-white"
                    type="submit"
                    id="nbtn"
                  >
                    Subscribe
                  </button>
                ) : (
                  <button
                    className="btn bg-dark text-white"
                    type="submit"
                    id="nbtn"
                    disabled
                  >
                    Subscribe
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
      <section className="section-padding footer-mid">
        <div className="container pt-15 pb-20">
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="widget-about font-md mb-md-5 mb-lg-0">
                <div className="logo logo-width-1 wow fadeIn animated">
                  <a href="./">
                    <img src={logo} alt="logo" />
                  </a>
                </div>
                <h5 className="mt-20 mb-10 fw-600 text-grey-4 wow fadeIn animated">
                  Contact
                </h5>
                <p className="wow fadeIn animated">
                  <strong>
                    <i className="fi-rs-location-alt"></i>
                  </strong>{" "}
                  {address}
                </p>
                <p className="wow fadeIn animated">
                  <strong>
                    <i className="fi-rs-smartphone"></i>
                  </strong>{" "}
                  {phoneNumber}
                </p>
                <p className="wow fadeIn animated">
                  <strong>
                    <i className="fi-rs-envelope"></i>
                  </strong>{" "}
                  {email}
                </p>
                <p className="wow fadeIn animated">
                  <strong>Hrs: </strong>08:00 - 17:00, Lun - Sam
                </p>
                <h5 className="mb-10 mt-30 fw-600 text-grey-4 wow fadeIn animated">
                  Suivez-nous
                </h5>
                <div
                  className="mobile-social-icon wow fadeIn animated mb-sm-5 mb-md-0"
                  style={{ display: "block !important" }}
                >
                  <a
                    href={facebookurl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-3h2.5V9.5c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4H15.8c-1.2 0-1.6.7-1.6 1.5V12h2.7l-.4 3h-2.3v7A10 10 0 0 0 22 12z" />
                    </svg>
                  </a>

                  <a
                    href={twitterurl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.4 1.6a9.07 9.07 0 0 1-2.86 1.09 4.52 4.52 0 0 0-7.71 4.12A12.82 12.82 0 0 1 3 2.16 4.52 4.52 0 0 0 4.4 8.69a4.48 4.48 0 0 1-2-.56v.06a4.51 4.51 0 0 0 3.63 4.42 4.48 4.48 0 0 1-2 .07 4.52 4.52 0 0 0 4.21 3.12A9.05 9.05 0 0 1 2 19.54a12.78 12.78 0 0 0 6.92 2.03c8.3 0 12.84-6.87 12.84-12.84 0-.2 0-.39-.01-.58A9.22 9.22 0 0 0 23 3z" />
                    </svg>
                  </a>

                  <a
                    href={instagramurl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9zm4.5 3a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11zm0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5-1a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                    </svg>
                  </a>

                  <a
                    href={youtubeurl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M19.615 3.184C18.403 3 12 3 12 3s-6.403 0-7.615.184A3.79 3.79 0 0 0 1.184 6.385 39.98 39.98 0 0 0 1 12c0 1.977.066 3.827.184 5.615a3.79 3.79 0 0 0 3.201 3.201C5.597 21 12 21 12 21s6.403 0 7.615-.184a3.79 3.79 0 0 0 3.201-3.201C21.934 15.827 22 13.977 22 12c0-1.977-.066-3.827-.184-5.615a3.79 3.79 0 0 0-3.201-3.201zM10 15.5v-7l6 3.5-6 3.5z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-3">
              <h5 className="widget-title wow fadeIn animated">A propos</h5>
              <ul className="footer-list wow fadeIn animated mb-sm-5 mb-md-0">
                <li>
                  <NavLink
                    to="/"
                    end
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Accueil
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/Policy"
                    end
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Privacy Policy
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/Term">Terms &amp; Conditions</NavLink>
                </li>
                <li>
                  <NavLink
                    to="/contact"
                    end
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Contact
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="col-lg-2  col-md-3">
              <h5 className="widget-title wow fadeIn animated">Compte</h5>
              <ul className="footer-list wow fadeIn animated">
                <li></li>

                <li>
                  <NavLink to="/Cart">Voir Cart</NavLink>
                </li>
                <li>
                  <NavLink to="/Wishlist">Voir Wishlist</NavLink>
                </li>
              </ul>
            </div>
            <div className="col-lg-4">
              <h5 className="widget-title wow fadeIn animated">
                Install Application
              </h5>
              <div className="row">
                <div className="col-md-8 col-lg-12">
                  <p className="wow fadeIn animated">Depuis Google Play</p>
                  <div className="download-app wow fadeIn animated">
                    <a href="#" className="hover-up mb-sm-4 mb-lg-0">
                      <img className="active" src={storeImg} alt="" />
                    </a>

                    <a href="#" className="hover-up">
                      <img src="assets/imgs/theme/google-play.jpg" alt="" />
                    </a>
                  </div>
                </div>
                <div className="col-md-4 col-lg-12 mt-md-3 mt-lg-0">
                  <p className="mb-20 wow fadeIn animated">
                    Passerelles de paiement sécurisées
                  </p>
                  <img className="wow fadeIn animated" src={appImg} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container pb-20 wow fadeIn animated">
        <div className="row">
          <div className="col-12 mb-20">
            <div className="footer-bottom"></div>
          </div>
          <div className="col-lg-6">
            <p className="float-md-left font-sm text-muted mb-0">
              &copy; 2025, <strong className="text-brand">{copyRight}</strong>{" "}
              E-commerce Platform{" "}
            </p>
          </div>
          <div className="col-lg-6">
            <p className="text-lg-end text-start font-sm text-muted mb-0">
              Designed par <a>{copyRight}</a>. All rights reserved
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
