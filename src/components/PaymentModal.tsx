// MyModal.tsx
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Needed for modal behavior

type MyModalProps = {
  id: string;
  title: string;
  total: number;
};

const MyModal: React.FC<MyModalProps> = ({ id, title, total }) => {
  const [message, setMessage] = useState("");
  const [btnOpacity, setBtnOpacity] = useState(true);

  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

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
              <label htmlFor="total">Total</label>
              <input
                id="total"
                type="text"
                placeholder="Total"
                className="block w-full mb-2 border p-2 rounded"
                value={total + " $"}
                readOnly
              />

              <label htmlFor="paymentMethod">
                Choisissez le mode de paiement :
              </label>
              <select
                id="paymentMethod"
                className="block w-full mb-2 border p-2 rounded"
                value={selectedOption}
                onChange={handleChange}
              >
                <option value="">-- Sélectionnez --</option>
                <option value="mpesa">M-pesa</option>
                <option value="orange">Orange</option>
                <option value="airtel">Airtel</option>
              </select>

              <br />

              {btnOpacity ? (
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded w-full"
                >
                  Paie
                </button>
              ) : (
                <button
                  type="button"
                  className="bg-blue-600 text-white px-4 py-2 rounded w-full"
                  disabled
                >
                  Paie
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
