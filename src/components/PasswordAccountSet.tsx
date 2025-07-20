import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { urlAppApi } from "./Variables";

//Icon configuration

const EyeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="19"
    height="19"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="19"
    height="19"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
  >
    <path d="M17.94 17.94A10.94 10.94 0 0112 20C5 20 1 12 1 12a21.81 21.81 0 014.19-5.94" />
    <path d="M22.54 12.88A21.81 21.81 0 0012 4c-1.61 0-3.16.38-4.56 1.06" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const PasswordAccountSet: React.FC = () => {
  const [searchParams] = useSearchParams();
  const auken = searchParams.get("usertoken") || "";
  const [message, setMessage] = useState("");
  const [messageSuccess, setmessageSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    token: auken || "",
    passwordOne: "",
    passwordTwo: "",
  });

  const [btnOpacity, setBtnOpacity] = useState(true);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //Submit login form for login account
  const handleProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      formData.token == "" ||
      formData.passwordOne == "" ||
      formData.passwordTwo == ""
    ) {
      setMessage("Veuillez remplir tous le champs.");
      return false;
    }

    if (formData.passwordOne !== formData.passwordTwo) {
      setMessage("Les mots de passe saisis ne correspondent pas.");
      return false;
    }

    let token = formData.token;
    let passwordOne = formData.passwordOne;
    let passwordTwo = formData.passwordTwo;

    setBtnOpacity(false);
    try {
      const response = await fetch(
        `${urlAppApi}productupdateuserpassword.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            token,
            passwordOne,
            passwordTwo,
          }),
        }
      );

      const result = await response.json();

      if (result.success) {
        setMessage("");
        setmessageSuccess(
          "Modification du mot de passe effectuée avec succès."
        );
      } else {
        setBtnOpacity(true);

        //Invalid email exist
        if (result.message == "Both password fields are required") {
          setMessage("Veuillez remplir les deux champs de mot de passe.");
        }

        if (result.message == "Passwords do not match") {
          setMessage("Les mots de passe saisis ne correspondent pas.");
        }

        if (result.message == "Missing reset token") {
          setMessage("Veuillez fournir le jeton de réinitialisation.");
        }

        if (result.message == "Invalid or expired token") {
          setMessage("Ce lien de réinitialisation n’est plus valide.");
        }

        if (result.message == "Expired date") {
          setMessage("Le lien de réinitialisation n’est plus valide.");
        }

        //La mise à jour du mot de passe a été effectuée avec succès.

        if (result.message == "Password does not meet security requirements") {
          setMessage(
            "Veuillez saisir un mot de passe sécurisé contenant au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial."
          );
        }

        console.log(result.message);
      }
    } catch (error) {
      setMessage("Error connecting to the server.");
      console.error("Login error:", error);
      setBtnOpacity(true);
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-md-4">
          <div className="dashboard-menu">
            <ul className="nav flex-column" role="tablist">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  id="dashboard-tab"
                  data-bs-toggle="tab"
                  href="#dashboard"
                  role="tab"
                  aria-controls="dashboard"
                  aria-selected="true"
                >
                  <i className="fi-rs-settings-sliders mr-10"></i>Mot de passe
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-8">
          <div className="tab-content dashboard-content">
            <div
              className="tab-pane fade active show"
              id="dashboard"
              role="tabpanel"
              aria-labelledby="dashboard-tab"
            >
              <div className="card">
                <div className="card-header">
                  <h5>Modification de mot de passe</h5>
                </div>

                <div className="card-body">
                  <form
                    className="contact-form-style text-center"
                    id="frmSignupCompteEd"
                    method="post"
                    onSubmit={handleProfile}
                  >
                    <div className="row">
                      <div className="col-lg-12 col-md-12">
                        <div className="input-style mb-20">
                          <input
                            name="passwordOne"
                            placeholder="Mot de passe"
                            type={showPassword ? "text" : "password"}
                            value={formData.passwordOne}
                            onChange={handleChange}
                          />
                          <input
                            name="token"
                            type="hidden"
                            value={formData.token}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12">
                        <div className="input-style mb-20">
                          <input
                            name="passwordTwo"
                            placeholder="Confirmer mot de passe"
                            type={showPassword ? "text" : "password"}
                            value={formData.passwordTwo}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="col-lg-10 col-md-10">
                        <p style={{ textAlign: "left" }}>
                          Veuillez saisir un mot de passe sécurisé contenant au
                          moins 8 caractères, une lettre majuscule, une lettre
                          minuscule, un chiffre et un caractère spécial..{" "}
                        </p>
                      </div>

                      <div className="col-lg-2 col-md-2">
                        <i
                          style={{ float: "right" }}
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                        </i>
                      </div>

                      <div
                        className="col-lg-12 col-md-12 mt-3"
                        style={{ textAlign: "left" }}
                      >
                        {btnOpacity ? (
                          <button type="submit" className="submit">
                            Modifier
                          </button>
                        ) : (
                          <button type="button" className="submit" disabled>
                            Modifier
                          </button>
                        )}
                      </div>

                      {message && (
                        <div className="alert alert-danger mt-3" role="alert">
                          {message}
                        </div>
                      )}

                      {messageSuccess && (
                        <div className="alert alert-success mt-3" role="alert">
                          {messageSuccess}
                        </div>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordAccountSet;
