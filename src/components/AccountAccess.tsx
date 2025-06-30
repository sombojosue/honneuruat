import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/imgs/theme/logo.svg";
import { urlApp } from "./Variables";

type LoginFormProps = {
  setActiveForm: (form: string) => void;
};

const AccountAccess = () => {
  const [activeForm, setActiveForm] = useState("login"); // 'login' | 'password' | 'register'

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="space-x-2">
        <header className="mb-4 text-center">
          <img src={logo} style={{ width: "160px" }} alt="Logo" />
        </header>
      </div>

      <div className="w-full max-w-sm">
        {activeForm === "login" && <LoginForm setActiveForm={setActiveForm} />}
        {activeForm === "password" && (
          <PasswordForm setActiveForm={setActiveForm} />
        )}
        {activeForm === "register" && (
          <RegisterForm setActiveForm={setActiveForm} />
        )}
      </div>
    </div>
  );
};

const LoginForm = ({ setActiveForm }: LoginFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [btnOpacity, setBtnOpacity] = useState(true);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  //Submit login form for login account
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //Checking if username or password is empty

    if (username == "" || password == "") {
      setMessage("Veuillez saisir un nom d'utilisateur ou un mot de passe.");
      return false;
    }

    setBtnOpacity(false);

    try {
      const response = await fetch(`${urlApp}productlogin.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username,
          password,
        }),
      });

      const result = await response.json();

      if (result.success) {
        //setMessage("Login successful!");

        if (result.account_disabled == 0) {
          // Clean any lingering Bootstrap modal backdrops on mount
          document.body.classList.remove("modal-open");
          const backdrops = document.querySelectorAll(".modal-backdrop");
          backdrops.forEach((backdrop) => backdrop.remove());
          document.body.style.overflow = "auto"; // reset on unmount

          localStorage.setItem("userName", result.name);
          localStorage.setItem("userAvatar", result.avatar);
          localStorage.setItem("userEmail", username);
          localStorage.setItem("userPhone", result.phone);
          localStorage.setItem("userToken", result.account_token);
          localStorage.setItem("userAddress", result.address);
          // Optionally store token or redirect
          navigate("/Shop");
        } else {
          setBtnOpacity(true);
          setMessage(
            "Votre compte a été désactivé. Veuillez contacter l’administrateur pour plus d’informations."
          );
        }
      } else {
        setBtnOpacity(true);
        //password failed
        if (result.message == "password failed") {
          setMessage("Mot de passe incorrect. Veuillez réessayer.");
          console.log(result.message);
        } else {
          setMessage("Nom d'utilisateur ou mot de passe invalide.");
        }
      }
    } catch (error) {
      setBtnOpacity(true);
      setMessage("Error connecting to the server.");
      console.error("Login error:", error);
    }
  };

  return (
    <form className="border p-4 rounded shadow" onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="E-mail"
        className="block w-full mb-2 border p-2 rounded"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type={showPassword ? "text" : "password"}
        placeholder="Mot de passe"
        className="block w-full mb-2 border p-2 rounded"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="row">
        <div className="col-6">
          <a
            href="#"
            onClick={() => setActiveForm("password")}
            className="forgot-pass"
          >
            Mot de passe oublié ?
          </a>
        </div>
        <div className="col-6">
          <i
            className="bx bx-hide fi-rs-eye"
            onClick={togglePasswordVisibility}
            style={{ float: "right" }}
          ></i>
        </div>
      </div>
      <br />
      {btnOpacity ? (
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          S'identifier
        </button>
      ) : (
        <button
          type="button"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          disabled
        >
          S'identifier
        </button>
      )}

      <p className="mt-4 text-center text-sm text-red-600">
        Vous n'avez pas de compte ?{" "}
        <a href="#" onClick={() => setActiveForm("register")}>
          S'inscrire
        </a>
      </p>

      {message && (
        <div className="alert alert-danger" role="alert">
          {message}
        </div>
      )}
    </form>
  );
};

const PasswordForm = ({ setActiveForm }: LoginFormProps) => {
  return (
    <form className="border p-4 rounded shadow">
      <input
        type="email"
        placeholder="E-mail"
        className="block w-full mb-2 border p-2 rounded"
      />
      <p className="mt-2 mb-2 text-sm text-red-600">
        Après avoir saisi votre adresse e-mail, vous recevrez un lien contenant
        les instructions pour réinitialiser votre compte.
      </p>
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded w-full"
      >
        Confirmer
      </button>

      <p className="mt-4 text-center text-sm text-red-600">
        Vous avez trouve votre compte ?{" "}
        <a href="#" onClick={() => setActiveForm("login")}>
          S'identifier
        </a>
      </p>
    </form>
  );
};

const RegisterForm = ({ setActiveForm }: LoginFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [btnOpacity, setBtnOpacity] = useState(true);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  //Submit login form for login account
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (username == "" || password == "" || phone == "" || name == "") {
      setMessage("Veuillez remplir tous les champs.");
      return false;
    }

    setBtnOpacity(false);
    try {
      const response = await fetch(`${urlApp}productregister.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username,
          password,
          name,
          phone,
        }),
      });

      const result = await response.json();

      if (result.success) {
        localStorage.setItem("userName", name);
        localStorage.setItem(
          "userAvatar",
          "https://inovsell.com/profile/profile.png"
        );
        localStorage.setItem("userEmail", username);
        localStorage.setItem("userPhone", phone);
        localStorage.setItem("userToken", result.message);
        localStorage.setItem("userAddress", "-");
        //setMessage("Login successful!");
        setMessage("");
        // Clean any lingering Bootstrap modal backdrops on mount
        document.body.classList.remove("modal-open");
        const backdrops = document.querySelectorAll(".modal-backdrop");
        backdrops.forEach((backdrop) => backdrop.remove());
        document.body.style.overflow = "auto"; // reset on unmount
        // Optionally store token or redirect
        navigate("/Shop");
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

        console.log(message);
      }
    } catch (error) {
      setMessage("Error connecting to the server.");
      console.error("Login error:", error);
    }
  };

  return (
    <form className="border p-4 rounded shadow" onSubmit={handleRegister}>
      {message && (
        <div className="alert alert-danger" role="alert">
          {message}
        </div>
      )}

      <input
        type="text"
        placeholder="Nom complet"
        className="block w-full mb-2 border p-2 rounded"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="phone"
        placeholder="Téléphone  ex.0839003000"
        className="block w-full mb-2 border p-2 rounded"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        type="email"
        placeholder="E-mail"
        className="block w-full mb-2 border p-2 rounded"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type={showPassword ? "text" : "password"}
        placeholder="Mot de passe"
        className="block w-full mb-2 border p-2 rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="row">
        <div className="col-10">
          Veuillez saisir un mot de passe sécurisé contenant au moins une lettre
          majuscule, une lettre minuscule, un chiffre et un caractère spécial.
        </div>
        <div className="col-2">
          <i
            className="bx bx-hide fi-rs-eye"
            onClick={togglePasswordVisibility}
            style={{ float: "right" }}
          ></i>
        </div>
      </div>
      <br />

      {btnOpacity ? (
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Enregistre
        </button>
      ) : (
        <button
          type="button"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          disabled
        >
          Enregistre
        </button>
      )}

      <p className="mt-4 text-center text-sm text-red-600">
        Vous avez trouve votre compte ?{" "}
        <a href="#" onClick={() => setActiveForm("login")}>
          S'identifier
        </a>
      </p>
    </form>
  );
};

export default AccountAccess;
