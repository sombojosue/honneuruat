import React, { useState, useRef } from "react";

const Profile: React.FC = () => {
  const [formData, setFormData] = useState({
    name: localStorage.getItem("userName") || "",
    email: localStorage.getItem("userEmail") || "",
    phone: localStorage.getItem("userPhone") || "",
    address: localStorage.getItem("userAddress") || "",
    password: "",
  });

  const [image, setImage] = useState(localStorage.getItem("userAvatar") || "");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditImage = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data:", formData);
    console.log("Profile image base64:", image);
    // Submit logic here (e.g., axios.post)
  };

  return (
    <div className="container mt-5">
      {/* Profile Image Section */}
      <div className="mb-4">
        <img
          src={image || ""}
          alt="Profile"
          className="rounded-circle mb-2"
          style={{
            width: 120,
            height: 120,
            objectFit: "cover",
            border: "2px solid #ccc",
          }}
        />
        <br />
        <button
          type="button"
          className="btn btn-outline-secondary btn-sm"
          onClick={handleEditImage}
        >
          Modifier l'image
        </button>
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label htmlFor="name" className="form-label">
            Nom
          </label>
          <input
            type="text"
            name="name"
            className="form-control"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="phone" className="form-label">
            Téléphone
          </label>
          <input
            type="tel"
            name="phone"
            className="form-control"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="password" className="form-label">
            Mot de passe
          </label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="address" className="form-label">
            Adresse
          </label>
          <input
            type="text"
            name="address"
            className="form-control"
            id="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Modifier
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
