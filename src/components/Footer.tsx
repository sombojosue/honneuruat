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
import facebook from "../assets/imgs/icons/facebook.png";
import instagram from "../assets/imgs/icons/instagram.png";
import youtube from "../assets/imgs/icons/youtube.png";
import twitter from "../assets/imgs/icons/twitter.png";

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
          "Merci ! Vous êtes maintenant abonné(e) à notre newsletter."
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
                  <a href={facebookurl}>
                    <img src={facebook} alt="facebook" />
                  </a>
                  <a href={twitterurl}>
                    <img src={twitter} alt="twitter" width={24} height={24} />
                  </a>
                  <a href={instagramurl}>
                    <img
                      src={instagram}
                      alt="instagram"
                      width={24}
                      height={24}
                    />
                  </a>

                  <a href={youtubeurl}>
                    <img src={youtube} alt="youtube" width={24} height={24} />
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
