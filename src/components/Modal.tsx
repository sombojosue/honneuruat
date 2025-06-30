// MyModal.tsx
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Needed for modal behavior
import AccountAccess from "./AccountAccess";

type MyModalProps = {
  id: string;
  title: string;
  body: string;
};

const MyModal: React.FC<MyModalProps> = ({ id, title }) => {
  return (
    <div
      className="modal fade"
      id={id}
      tabIndex={-1}
      aria-labelledby={`${id}Label`}
      aria-hidden="true"
    >
      <div className="modal-dialog">
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
            <AccountAccess />
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
