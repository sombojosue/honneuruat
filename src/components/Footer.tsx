import { NavLink } from "react-router-dom";
import "../assets/css/main.css";
import emailIcon from "../assets/imgs/theme/icons/email.svg";
import logo from "../assets/imgs/theme/logo.svg";
import { phoneNumber, email, address, copyRight } from "./Variables";
import storeImg from "../assets/imgs/theme/app-store.jpg";
import appImg from "../assets/imgs/theme/payment-method.png";

//import "../App.css";

function Footer() {
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
                  <h4
                    id="newsmsg"
                    style={{ marginLeft: "20px", color: "#fff" }}
                  ></h4>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <form className="form-subcriber d-flex wow fadeIn animated">
                <input
                  type="email"
                  id="email"
                  className="form-control bg-white font-small"
                  placeholder="Entrer votre Email"
                  required
                />
                <button
                  className="btn bg-dark text-white"
                  type="submit"
                  id="nbtn"
                >
                  Subscribe
                </button>
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
                  <a href="https://web.facebook.com/profile.php?id=100095673456226">
                    <img
                      src="assets/imgs/theme/icons/icon-facebook.svg"
                      alt=""
                    />
                  </a>
                  <a href="https://twitter.com/inovsell">
                    <img
                      src="assets/imgs/theme/icons/icon-twitter.svg"
                      alt=""
                    />
                  </a>
                  <a href="https://www.instagram.com/inovsell/">
                    <img
                      src="assets/imgs/theme/icons/icon-instagram.svg"
                      alt=""
                    />
                  </a>

                  <a href="https://www.youtube.com/@InovSell">
                    <img
                      src="assets/imgs/theme/icons/icon-youtube.svg"
                      alt=""
                    />
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
                    to="/policy"
                    end
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Privacy Policy
                  </NavLink>
                </li>
                <li>
                  <NavLink to="term-condition">Terms &amp; Conditions</NavLink>
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
                  <NavLink to="cart">Voir Cart</NavLink>
                </li>
                <li>
                  <NavLink to="wishlist">Voir Wishlist</NavLink>
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
