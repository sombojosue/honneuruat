import React, { useState } from "react";
import MyModalLogOut from "./MyModalLogOut";
import Modal from "./Modal";
import ProfileImageUploader from "./ProfileImageUploader";
import { urlApp } from "./Variables";

const ProfileText: React.FC = () => {
  //const userAccount = localStorage.getItem("userName") || "";
  const avatar = localStorage.getItem("userAvatar") || "";
  const [message, setMessage] = useState("");
  const [MessageSuccess, setMessageSuccess] = useState("");
  const [formData, setFormData] = useState({
    name: localStorage.getItem("userName") || "",
    phone: localStorage.getItem("userPhone") || "",
    address: localStorage.getItem("userAddress") || "",
    password: "",
  });

  //const [command, setCommand] = useState("");
  //const [email, setEmail] = useState("");
  const [btnOpacity, setBtnOpacity] = useState(true);

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

    let email = localStorage.getItem("userEmail") || "";
    let password = formData.password;
    let phone = formData.phone;
    let name = formData.name;
    let address = formData.address;
    let token = localStorage.getItem("userToken") || "";

    if (
      email == "" ||
      formData.phone == "" ||
      formData.name == "" ||
      token == ""
    ) {
      setMessage("Veuillez remplir votre E-mail, phone et votre nom.");
      return false;
    }

    setBtnOpacity(false);
    try {
      const response = await fetch(`${urlApp}productupdateuser.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          email,
          password,
          name,
          phone,
          address,
          token,
        }),
      });

      const result = await response.json();
      console.log(result.message);

      if (result.success) {
        localStorage.setItem("userName", name);
        localStorage.setItem(
          "userAvatar",
          "https://inovsell.com/profile/profile.png"
        );
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userPhone", phone);
        localStorage.setItem("userToken", token);
        localStorage.setItem("userAddress", address);
        //setMessage("Login successful!");
        setMessageSuccess("Modification du compte effectuée avec succès.");
        setMessage("");
      } else {
        setBtnOpacity(true);
        if (result.message == "Invalid empty username") {
          setMessage("Le nom d'utilisateur ne peut pas être vide.");
        }
        if (result.message == "Invalid empty password") {
          setMessage("Le mot de passe ne peut pas être vide.");
        }
        if (result.message == "Invalid empty name") {
          setMessage("Le nom ne peut pas être vide.");
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
        if (result.message == "Invalid phone len") {
          setMessage(
            "Veuillez saisir un numéro de téléphone valide contenant exactement 10 chiffres."
          );
        }
        //Invalid email exist
        if (result.message == "Invalid email exist") {
          setMessage(
            "Cette adresse e-mail est déjà utilisée. Veuillez en choisir une autre pour vous connecter."
          );
        }

        if (result.message == "Invalid password") {
          setMessage(
            "Veuillez saisir un mot de passe sécurisé contenant au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial."
          );
        }

        if (result.message == "Invalid name") {
          setMessage("Le nom ne doit contenir que des lettres et des espaces.");
        }

        if (result.message == "Invalid Account") {
          setMessage("L'adresse e-mail n'existe pas dans notre système.");
        }

        if (result.message == "Invalid Phone") {
          setMessage("Numéro de téléphone est déjà utilisée.");
        }

        if (result.message == "Invalid Address") {
          setMessage("L'adresse  n'est doit pas reste vide.");
        }

        console.log(result.message);
      }
    } catch (error) {
      setMessage("Error connecting to the server.");
      console.error("Login error:", error);
      setBtnOpacity(true);
    }
  };

  //Checking if user is not yet login into the system
  if (!formData.name)
    return (
      <>
        <div className="col-lg-9">
          <div className="shop-product-fillter">
            <div className="totall-product">
              <p>
                {" "}
                Désolé vous devrez vous connecter{" "}
                <strong>pour voir votre profile.</strong>{" "}
              </p>
              <p>
                <a
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  href="#"
                >
                  Connecter vous ici -&gt;
                </a>
              </p>
            </div>
          </div>
        </div>

        <Modal
          id="exampleModal"
          title="Se connecter"
          body="Ceci est le contenu de la modal Bootstrap."
        />
      </>
    );

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
                  <i className="fi-rs-settings-sliders mr-10"></i>Tableau de
                  bord
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  id="orders-tab"
                  data-bs-toggle="tab"
                  href="#orders"
                  role="tab"
                  aria-controls="orders"
                  aria-selected="false"
                >
                  <i className="fi-rs-shopping-bag mr-10"></i>Commander
                </a>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link"
                  id="account-detail-tab"
                  data-bs-toggle="tab"
                  href="#account-detail"
                  role="tab"
                  aria-controls="account-detail"
                  aria-selected="false"
                >
                  <i className="fi-rs-user mr-10"></i>Détails de compte
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-bs-toggle="modal"
                  data-bs-target="#myModalLogOut"
                  href="#"
                >
                  <i className="fi-rs-sign-out mr-10"></i>Quitter
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
                  <h5 className="mb-0">Bonjour {formData.name} !</h5>
                </div>
                <div className="card-body">
                  <p>
                    Depuis le tableau de bord de votre compte. vous pouvez
                    facilement vérifier et afficher vos commandes récentes,
                    gérer vos adresses de livraison et de facturation et
                    modifier votre mot de passe et les détails de votre compte.
                  </p>
                </div>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="orders"
              role="tabpanel"
              aria-labelledby="orders-tab"
            >
              <div className="card">
                <div className="card-header">
                  <h5 className="mb-0">Votre commande</h5>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>#</th>

                          <th>Commandeid</th>
                          <th>Date</th>
                          <th>Nbr. des Items</th>
                          <th>Prix</th>
                          <th>Détails</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1 </td>

                          <td data-title="Orderid">LO20241227IHG1XE2B4Q</td>

                          <td data-title="Booking date">Dec 30, 2024 </td>

                          <td data-title="Nbr. of Items">2 </td>

                          <td data-title="Price">£2500 </td>

                          <td data-title="Details">
                            <a href="detailsitems.php?trackid=LO20241227IHG1XE2B4Q">
                              <i className="fi-rs-arrow-right"></i>
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>2 </td>

                          <td data-title="Orderid">LO20230822AMBFWKZLVQ</td>

                          <td data-title="Booking date">Aug 25, 2023 </td>

                          <td data-title="Nbr. of Items">2 </td>

                          <td data-title="Price">£65 </td>

                          <td data-title="Details">
                            <a href="detailsitems.php?trackid=LO20230822AMBFWKZLVQ">
                              <i className="fi-rs-arrow-right"></i>
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="tab-pane fade"
              id="account-detail"
              role="tabpanel"
              aria-labelledby="account-detail-tab"
            >
              <div className="card">
                <div className="card-header">
                  <h5>Détails du compte</h5>
                </div>

                <div className="card-body">
                  <form
                    className="contact-form-style text-center"
                    id="frmSignupCompteEd"
                    method="post"
                    onSubmit={handleProfile}
                  >
                    {/* Image editing */}
                    <div className="d-flex align-items-center mb-4">
                      <img
                        src={avatar || "https://inovsell/profile/profile.png"}
                        alt="Profile"
                        className="img-thumbnail rounded-circle"
                        style={{ width: "220px", height: "220px" }}
                      />
                      <button
                        type="button"
                        className="edit-btn"
                        style={{ marginTop: "168px" }}
                        aria-label="Edit image"
                        data-bs-toggle="modal"
                        data-bs-target="#myModalImage"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-pencil"
                          viewBox="0 0 16 16"
                        >
                          <path d="M12.146.854a.5.5 0 0 1 .708 0l2.292 2.292a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 3L13 4.793 14.793 3 13 1.207 11.207 3zM10.5 3.707L2 12.207V13h.793l8.5-8.5-1.793-1.793z" />
                        </svg>
                      </button>
                    </div>

                    {/* End of image editing */}
                    <div className="row">
                      <div className="col-lg-12 col-md-12">
                        <div className="input-style mb-20">
                          <input
                            name="name"
                            placeholder="Nom"
                            id="nameSignupEd"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12">
                        <div className="input-style mb-20">
                          <input
                            name="email"
                            placeholder="Email"
                            id="emailSignupEd"
                            type="email"
                            value={localStorage.getItem("userEmail") || ""}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12">
                        <div className="input-style mb-20">
                          <input
                            name="phone"
                            placeholder="Phone"
                            id="phoneSignupEd"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12">
                        <div className="textarea-style mb-30">
                          <textarea
                            name="address"
                            placeholder="Message"
                            value={formData.address}
                            onChange={handleChange}
                          ></textarea>
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12">
                        <div className="input-style mb-20">
                          <input
                            name="password"
                            placeholder="Mot de passe"
                            id="passwordSignupEd"
                            type="password"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-10 mb-3">
                        <p
                          style={{
                            textAlign: "left",
                          }}
                        >
                          Veuillez saisir un mot de passe sécurisé contenant au
                          moins une lettre majuscule, une lettre minuscule, un
                          chiffre et un caractère spécial.
                        </p>
                      </div>
                      <div className="col-lg-12 col-md-12">
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

                      {MessageSuccess && (
                        <div className="alert alert-success mt-3" role="alert">
                          {MessageSuccess}
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
      <MyModalLogOut
        id="myModalLogOut"
        title="Déconnexion"
        body="Voulez-vous vraiment vous déconnecter ?"
      />
      <ProfileImageUploader
        id="myModalImage"
        title="Modifier la photo de profil"
      />
    </>
  );
};

export default ProfileText;
