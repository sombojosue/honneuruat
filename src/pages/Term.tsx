import { CartProvider } from "../components/CartContext.tsx";
import Menu from "../components/Menu.tsx";
import Footer from "../components/Footer.tsx";
import ScrollToTop from "../components/ScrollToTop.tsx";
import { email, phoneNumber, address } from "../components/Variables.tsx";
// pages/Home.tsx

function Term() {
  return (
    <>
      <ScrollToTop />
      <CartProvider>
        <Menu />
        <main className="main">
          <div className="page-header breadcrumb-wrap">
            <div className="container">
              <div className="breadcrumb">
                <a href="./" rel="nofollow">
                  Accueil
                </a>
                <span></span> A propos
              </div>
            </div>
          </div>

          <section className="section-padding">
            {/*Start of condition*/}

            <div className="container my-5">
              <div className="card shadow-sm rounded-4">
                <div className="card-body p-4">
                  <h1 className="mt-0 mb-15 text-uppercase font-sm text-brand wow fadeIn animated animated animated">
                    🛡️ Politique de Confidentialité
                  </h1>

                  <h4 className="mt-0 mb-15 text-uppercase font-sm">
                    1. Introduction
                  </h4>
                  <p>
                    Bienvenue sur notre plateforme. En accédant à nos services,
                    vous acceptez de respecter les conditions générales
                    ci-dessous. Ces politiques visent à garantir une expérience
                    sûre, équitable et transparente pour tous les utilisateurs.
                  </p>
                  <ul>
                    <li>Vente de designs</li>
                    <li>Réservations (salles, restaurants, hôtels)</li>
                    <li>Planification d'événements</li>
                  </ul>

                  <br />

                  <h4 className="mt-0 mb-15 text-uppercase font-sm">
                    2. Politique de Vente de Designs
                  </h4>
                  <p>
                    <strong>a. Informations sur les produits :</strong>{" "}
                    Descriptions précises, validation requise pour les
                    personnalisations.
                  </p>
                  <p>
                    <strong>b. Propriété intellectuelle :</strong> Aucune
                    revente ou modification sans autorisation.
                  </p>
                  <p>
                    <strong>c. Livraison :</strong> Designs numériques par
                    e-mail, physiques avec suivi.
                  </p>
                  <p>
                    <strong>d. Retours & remboursements :</strong> Aucun
                    remboursement pour le numérique ; retours possibles pour le
                    physique sous 7 jours si défaut.
                  </p>

                  <br />

                  <h4 className="mt-0 mb-15 text-uppercase font-sm">
                    3. Politique de Réservation
                  </h4>
                  <p>
                    <strong>a. Champ d'application :</strong> Réservations
                    d'espaces pour événements personnels ou professionnels.
                  </p>
                  <p>
                    <strong>b. Processus :</strong> Paiement à l'avance requis,
                    confirmation par e-mail/SMS.
                  </p>
                  <p>
                    <strong>c. Annulations :</strong>
                  </p>
                  <ul>
                    <li>+7 jours : remboursement complet</li>
                    <li>3–7 jours : 50 %</li>
                    <li>-3 jours : aucun remboursement</li>
                  </ul>
                  <p>
                    <strong>d. Responsabilité :</strong> Le client doit
                    respecter les conditions du lieu réservé.
                  </p>

                  <br />

                  <h4 className="mt-0 mb-15 text-uppercase font-sm">
                    4. Politique de Planification d’Événements
                  </h4>
                  <p>
                    <strong>a. Services proposés :</strong> Consultation,
                    coordination, décoration, gestion sur site.
                  </p>
                  <p>
                    <strong>b. Paiements :</strong> 50 % à la réservation, solde
                    5 jours avant l’événement.
                  </p>
                  <p>
                    <strong>c. Annulations :</strong>
                  </p>
                  <ul>
                    <li>+14 jours : remboursement de 75 %</li>
                    <li>7–14 jours : 50 %</li>
                    <li>-7 jours : non remboursable</li>
                  </ul>
                  <p>
                    <strong>d. Responsabilités :</strong> Pas responsable des
                    prestataires externes non contractés via nous.
                  </p>
                  <br />
                  <h4 className="mt-0 mb-15 text-uppercase font-sm">
                    5. Conditions Générales
                  </h4>
                  <p>
                    <strong>a. Utilisation :</strong> Informations exactes et
                    comportement responsable exigés.
                  </p>
                  <p>
                    <strong>b. Confidentialité :</strong> Données traitées selon
                    notre politique de confidentialité.
                  </p>
                  <p>
                    <strong>c. Litiges :</strong> D’abord par notre service
                    client. Juridiction locale en cas de désaccord.
                  </p>

                  <br />
                  <h4 className="mt-0 mb-15 text-uppercase font-sm">
                    6. Contact
                  </h4>
                  <ul>
                    <li>
                      <strong>Email :</strong> {email}
                    </li>
                    <li>
                      <strong>Téléphone :</strong> {phoneNumber}
                    </li>
                    <li>
                      <strong>Adresse :</strong> [{address}]
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* End of condition */}
          </section>
          <Footer />
        </main>
      </CartProvider>
    </>
  );
}

export default Term;
