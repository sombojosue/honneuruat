// MyModal.tsx
import React, { useState, useEffect } from "react";
import { urlApp, urlAppApi } from "./Variables";

type Props = {
  id: string;
  title: string;
};

const ProfileImageUploader: React.FC<Props> = ({ id, title }) => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [btnOpacity, setBtnOpacity] = useState(true);
  const [messageSuccess, setMessageSuccess] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
  };

  const handleUpload = async () => {
    if (!image) {
      setMessage("Veuillez sélectionner une image.");
      return;
    }
    setBtnOpacity(false);
    const formData = new FormData();
    formData.append("profile", image);
    formData.append("email", localStorage.getItem("userEmail") || "");
    formData.append("token", localStorage.getItem("userToken") || "");

    try {
      const response = await fetch(`${urlAppApi}productupdateuserimage.php`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setMessage("");
        setMessageSuccess(
          "✅ " +
            data.message +
            "\n" +
            "Veuillez actualiser la page pour voir les modifications mises à jour."
        );
        localStorage.setItem("userAvatar", urlApp + data.path);
        setBtnOpacity(true);
      } else {
        console.log(data.message);
        if (data.message == "Invalid size") {
          setMessage("La taille de l'image ne doit pas dépasser 800Kb.");
        }
        if (data.message == "Invalid type") {
          setMessage(
            "Type de fichier non autorisé. Utilise seulement png,jpg,jpeg, gif"
          );
        }
        if (data.message == "Invalid connection") {
          setMessage("Échec de connexion à la base de données.");
        }

        if (data.message == "Invalid account") {
          setMessage("Email ou jeton manquant.");
        }

        if (data.message == "Invalid login") {
          setMessage("Aucun compte correspondant ou mise à jour échouée.");
        }

        if (data.message == "Invalid upload") {
          setMessage("Échec du déplacement du fichier téléchargé.");
        }
        //setMessage("❌ " + data.message);
        setBtnOpacity(true);
      }
    } catch (error) {
      setMessage("Erreur lors de l'envoi de l'image.");
      setBtnOpacity(true);
    }
  };

  // Clean up preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

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
            {preview && (
              <img
                src={preview}
                alt="Aperçu"
                className="img-thumbnail mb-3"
                width="200"
              />
            )}

            <div className="mb-3">
              <input
                type="file"
                accept="image/*"
                className="form-control"
                onChange={handleFileChange}
              />
            </div>

            {btnOpacity ? (
              <button className="submit" onClick={handleUpload}>
                Mettre à jour
              </button>
            ) : (
              <button className="submit" onClick={handleUpload} disabled>
                Mettre à jour
              </button>
            )}

            {message && (
              <div className="alert alert-danger mt-3 text-center">
                {message}
              </div>
            )}

            {messageSuccess && (
              <div className="alert alert-success mt-3 text-center">
                {messageSuccess}
              </div>
            )}
          </div>
          <div className="modal-footer"></div>
        </div>
      </div>
    </div>
  );
};

export default ProfileImageUploader;
