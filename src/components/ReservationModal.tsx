// MyModal.tsx
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Needed for modal behavior
import { urlApp } from "./Variables";

type MyModalProps = {
  id: string;
  title: string;
  body: string;
};

const MyModal: React.FC<MyModalProps> = ({ id, title, body }) => {
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [messageSuccess, setMessageSuccess] = useState("");
  const [btnOpacity, setBtnOpacity] = useState(true);

  //Submit register form for login account
  const handleReservation = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const itemId = body;
    if (
      name == "" ||
      description == "" ||
      phone == "" ||
      email == "" ||
      time == "" ||
      date == "" ||
      itemId == ""
    ) {
      setMessage("Veuillez remplir tous les champs.");
      return false;
    }

    setBtnOpacity(false);
    try {
      const response = await fetch(`${urlApp}productreservation.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          name,
          description,
          email,
          phone,
          time,
          date,
          itemId,
        }),
      });

      const result = await response.json();

      if (result.success) {
        //setMessage("Login successful!");
        setMessage("");
        setMessageSuccess(
          "✅ Votre réservation a été effectuée avec succès. Merci pour votre confiance !"
        );
      } else {
        setBtnOpacity(true);
        setMessageSuccess("");

        if (result.message == "Invalid empty email") {
          setMessage("L'email d'utilisateur ne peut pas être vide.");
        }

        if (result.message == "Invalid book") {
          setMessage(
            "Désolé, cette date n'est plus disponible pour la réservation. Merci de choisir une autre date."
          );
        }

        if (result.message == "Invalid empty id") {
          setMessage("L'ID de réservation ne doit pas être vide.");
        }
        if (result.message == "Invalid empty description") {
          setMessage("La description ne doit pas être vide.");
        }
        if (result.message == "Invalid empty name") {
          setMessage("Le nom ne peut pas être vide.");
        }
        if (result.message == "Invalid empty phone") {
          setMessage("Le numéro de téléphone ne peut pas être vide.");
        }

        if (result.message == "Invalid time") {
          setMessage("Veuillez saisir l'heure.");
        }
        if (result.message == "Invalid phone") {
          setMessage("Veuillez saisir un numéro de téléphone valide.");
        }
        if (result.message == "Invalid id") {
          setMessage("Veuillez saisir un ID de réservation valide.");
        }
        if (result.message == "Invalid phone len") {
          setMessage(
            "Veuillez saisir un numéro de téléphone valide contenant exactement 10 chiffres."
          );
        }

        if (result.message == "Invalid name") {
          setMessage("Le nom ne doit contenir que des lettres et des espaces.");
        }

        console.log(message);
      }
    } catch (error) {
      setMessage("Error connecting to the server.");
      console.error("Login error:", error);
      setBtnOpacity(true);
    }
  };

  return (
    <div
      className="modal fade"
      id={id}
      tabIndex={-1}
      aria-labelledby={`${id}Label`}
      style={{ zIndex: 99999 }}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={`${id}Label`}>
              {title}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Fermer"
            ></button>
          </div>
          <div className="modal-body">
            <form
              className="border p-4 rounded shadow"
              onSubmit={handleReservation}
            >
              {message && (
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              )}
              {messageSuccess && (
                <div className="alert alert-success" role="alert">
                  {messageSuccess}
                </div>
              )}
              <label htmlFor="name">Nom complet</label>
              <input
                id="name"
                type="text"
                placeholder="Nom complet"
                className="block w-full mb-2 border p-2 rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="phone">Téléphone</label>
              <input
                id="phone"
                type="phone"
                placeholder="Téléphone  ex.0839003000"
                className="block w-full mb-2 border p-2 rounded"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <label htmlFor="email">E-mail</label>
              <input
                id="email"
                type="email"
                placeholder="E-mail"
                className="block w-full mb-2 border p-2 rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="time">Heure de réservation</label>
              <input
                id="time"
                type="time"
                placeholder="Time"
                className="block w-full mb-2 border p-2 rounded"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />

              <label htmlFor="date">Date de réservation</label>
              <input
                id="date"
                type="date"
                placeholder="Date"
                className="block w-full mb-2 border p-2 rounded"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />

              <label htmlFor="message">Description</label>
              <textarea
                id="message"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="block w-full mb-2 border p-2 rounded"
                placeholder="Écris ton message ici"
                rows={3}
                cols={20}
              />

              <br />

              {btnOpacity ? (
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded w-full"
                >
                  Envoyer
                </button>
              ) : (
                <button
                  type="button"
                  className="bg-blue-600 text-white px-4 py-2 rounded w-full"
                  disabled
                >
                  Submit
                </button>
              )}
            </form>
            <div className="media-options"></div>
          </div>
          {/*End of login*/}
        </div>
        <div className="modal-footer"></div>
      </div>
    </div>
  );
};

export default MyModal;
