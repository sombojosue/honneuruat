// MyModal.tsx
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Needed for modal behavior

type MyModalProps = {
  id: string;
  title: string;
  body: string;
};

const MyModal: React.FC<MyModalProps> = ({ id, title }) => {
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [btnOpacity, setBtnOpacity] = useState(true);

  const handleReservation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("Success");
    setBtnOpacity(true);
    alert("success submit");
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
                value={message}
                onChange={(e) => setDate(e.target.value)}
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
