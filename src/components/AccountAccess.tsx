import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";
import logo from "../assets/imgs/theme/logo.png";
import { urlAppApi } from "./Variables";
import { urlApp } from "./Variables";

type LoginFormProps = {
  setActiveForm: (form: string) => void;
};

//EmailJs configuration
const SERVICE_ID = "service_cjdxkax";
const TEMPLATE_ID = "template_eirrw6z";
const PUBLIC_KEY = "EELIGcK2K6cF7HjKU";

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
      const response = await fetch(`${urlAppApi}productlogin.php`, {
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
          const modal = document.querySelector(
            ".modal.show"
          ) as HTMLElement | null;
          if (modal) {
            modal.classList.remove("show");
            modal.style.display = "none";
            modal.setAttribute("aria-hidden", "true");
          }

          document.body.classList.remove("modal-open");
          document
            .querySelectorAll(".modal-backdrop")
            .forEach((el) => el.remove());
          document.body.style.overflow = "auto";

          if (!result.avatar.startsWith("https://")) {
            console.log("Valid HTTPS URL");
            localStorage.setItem("userAvatar", urlApp + result.avatar);
          } else {
            localStorage.setItem("userAvatar", result.avatar);
          }

          localStorage.setItem("userName", result.name);

          localStorage.setItem("userEmail", username);
          localStorage.setItem("userPhone", result.phone);
          localStorage.setItem("userToken", result.account_token);
          localStorage.setItem("userAddress", result.address);
          // Optionally store token or redirect
          navigate("/Collections");
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
          <i style={{ float: "right" }} onClick={togglePasswordVisibility}>
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </i>
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
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [urlValue, setUrlValue] = useState("");
  const [btnOpacity, setBtnOpacity] = useState(true);
  const [messageSuccess, setMessageSuccess] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username) {
      setMessage("Veuillez saisir votre adresse e-mail.");
      return;
    }

    setBtnOpacity(false);

    try {
      const response = await fetch(`${urlAppApi}productpwdreset.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ username }),
      });

      const result = await response.json();

      if (result.success) {
        setMessage("");
        const resetLink = `https://sombojosue.github.io/honneuruat/PasswordAccount?usertoken=${result.message}`;
        setUrlValue(resetLink);
        // Inject resetLink into hidden input before sending
        if (formRef.current) {
          const linkInput = formRef.current.querySelector(
            "input[name='reset_link']"
          ) as HTMLInputElement;
          if (linkInput) linkInput.value = resetLink;
        }
        //Sending Email
        await emailjs.sendForm(
          SERVICE_ID,
          TEMPLATE_ID,
          formRef.current!,
          PUBLIC_KEY
        );
        //End of sending email

        setMessageSuccess(
          "✅ Un lien de réinitialisation a été envoyé. Veuillez vérifier votre boîte de réception."
        );
        setUsername("");
      } else {
        setMessageSuccess("");
        setMessage(
          result.message === "Invalid email exist"
            ? "L'adresse e-mail n'existe pas dans notre système."
            : "Échec de la réinitialisation. Veuillez réessayer."
        );
      }
    } catch (error) {
      console.error("Erreur:", error);
      setMessage("Erreur de connexion au serveur.");
    } finally {
      setBtnOpacity(true);
    }
  };

  return (
    <form
      ref={formRef}
      className="border p-4 rounded shadow"
      onSubmit={handleReset}
    >
      {messageSuccess && (
        <div className="alert alert-success">{messageSuccess}</div>
      )}
      {message && <div className="alert alert-danger">{message}</div>}

      <input
        type="email"
        name="user_email" // Required for EmailJS template
        placeholder="E-mail"
        className="block w-full mb-2 border p-2 rounded"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      {/* Hidden fields for EmailJS */}
      <input type="hidden" name="reset_link" value={urlValue} />

      <p className="text-sm mb-2 text-red-600">
        Après avoir saisi votre adresse e-mail, vous recevrez un lien contenant
        les instructions pour réinitialiser votre compte.
      </p>

      <button
        type="submit"
        className={`bg-blue-600 text-white px-4 py-2 rounded w-full ${
          !btnOpacity ? "opacity-50" : ""
        }`}
        disabled={!btnOpacity}
      >
        Confirmer
      </button>

      <p className="mt-4 text-center text-sm text-red-600">
        Vous avez retrouvé votre compte ?{" "}
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

  //Submit register form for login account
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (username == "" || password == "" || phone == "" || name == "") {
      setMessage("Veuillez remplir tous les champs.");
      return false;
    }

    setBtnOpacity(false);
    try {
      const response = await fetch(`${urlAppApi}productregister.php`, {
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
        const modal = document.querySelector(
          ".modal.show"
        ) as HTMLElement | null;
        if (modal) {
          modal.classList.remove("show");
          modal.style.display = "none";
          modal.setAttribute("aria-hidden", "true");
        }

        document.body.classList.remove("modal-open");
        document
          .querySelectorAll(".modal-backdrop")
          .forEach((el) => el.remove());
        document.body.style.overflow = "auto";

        navigate("/Collections");
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

        if (result.message == "Invalid Phone exist") {
          setMessage("Numéro de téléphone est déjà utilisée.");
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
      setBtnOpacity(true);
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
          Veuillez saisir un mot de passe sécurisé contenant au moins 8
          caractères, une lettre majuscule, une lettre minuscule, un chiffre et
          un caractère spécial.
        </div>
        <div className="col-2">
          <i style={{ float: "right" }} onClick={togglePasswordVisibility}>
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </i>
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
