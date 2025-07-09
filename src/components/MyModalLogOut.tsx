// MyModal.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Needed for modal behavior

type MyModalProps = {
  id: string;
  title: string;
  body: string;
};

const MyModalLogOut: React.FC<MyModalProps> = ({ id, title, body }) => {
  const navigate = useNavigate();

  const logOut = () => {
    const modal = document.querySelector(".modal.show") as HTMLElement | null;
    if (modal) {
      modal.classList.remove("show");
      modal.style.display = "none";
    }

    document.body.classList.remove("modal-open");
    document.querySelectorAll(".modal-backdrop").forEach((el) => el.remove());
    document.body.style.overflow = "auto";

    localStorage.setItem("userName", "");
    localStorage.setItem("userAvatar", "");
    localStorage.setItem("userEmail", "");
    localStorage.setItem("userPhone", "");
    localStorage.setItem("userToken", "");
    localStorage.setItem("userAddress", "");
    alert("Vous avez été déconnecté avec succès. À bientôt !");

    // Optionally store token or redirect
    navigate("/Shop");
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
            <p className="fs-7">{body}</p>
            <br />
            <button type="button" className="btn btn-danger" onClick={logOut}>
              Oui
            </button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Non
            </button>
          </div>
          {/*End of login*/}
        </div>
        <div className="modal-footer"></div>
      </div>
    </div>
  );
};

export default MyModalLogOut;
