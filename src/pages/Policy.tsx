import Menu from "../components/Menu.tsx";
import Footer from "../components/Footer.tsx";
import ScrollToTop from "../components/ScrollToTop.tsx";
import { NavLink } from "react-router-dom";
import { email, phoneNumber, address } from "../components/Variables.tsx";
// pages/Home.tsx

function Policy() {
  return (
    <>
      <ScrollToTop />

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
          <div className="container my-5">
            <div className="card shadow-sm rounded-4">
              <div className="card-body p-4">
                <div className="row">
                  <div className="col-lg-12 align-self-center mb-lg-0 mb-4">
                    <h1 className="mt-0 mb-15 text-uppercase font-sm text-brand wow fadeIn animated animated animated">
                      🛡️ Politique de la Plateforme
                    </h1>
                  </div>
                  {/*Start of display information */}
                  <div className="col-lg-12 align-self-center mb-lg-0 mb-4">
                    <section className="mb-5">
                      <h2 className="mt-0 mb-15 text-uppercase font-sm">
                        1. Introduction
                      </h2>
                      <p>
                        Bienvenue sur notre plateforme. En accédant à nos
                        services, vous acceptez de respecter les conditions
                        générales ci-dessous. Ces politiques visent à garantir
                        une expérience sûre, équitable et transparente pour tous
                        les utilisateurs.
                      </p>
                      <p>Nos services incluent :</p>
                      <ul>
                        <li>
                          <p>
                            La vente en ligne de{" "}
                            <strong>
                              designs personnalisés et prêts à l’emploi
                            </strong>
                          </p>
                        </li>
                        <li>
                          <p>
                            La <strong>réservation</strong> de salles,
                            restaurants et hébergements hôteliers
                          </p>
                        </li>
                        <li>
                          <p>
                            Des services complets de{" "}
                            <strong>planification d’événements</strong>
                          </p>
                        </li>
                      </ul>
                    </section>

                    <section className="mb-5">
                      <br />
                      <h2 className="mt-0 mb-15 text-uppercase font-sm">
                        2. Politique de Vente de Designs
                      </h2>
                      <p>a. Informations sur les produits</p>
                      <p>
                        Tous les designs sont présentés aussi précisément que
                        possible, avec des descriptions détaillées.
                      </p>
                      <p>
                        Les designs personnalisés nécessitent une validation
                        préalable du client avant production.
                      </p>

                      <p>b. Propriété intellectuelle</p>
                      <p>
                        Tous les designs sont des œuvres originales ou dûment
                        licenciées. Il est interdit de revendre, redistribuer ou
                        modifier les designs sans autorisation écrite.
                      </p>

                      <p>c. Livraison</p>
                      <p>
                        Les designs numériques sont livrés par e-mail ou via un
                        lien de téléchargement. Les designs physiques seront
                        expédiés avec suivi.
                      </p>

                      <p>d. Retours et remboursements</p>
                      <p>
                        Aucun remboursement n’est accordé pour les produits
                        numériques une fois livrés. Les produits physiques
                        peuvent être retournés sous 7 jours en cas de défaut ou
                        de non-conformité.
                      </p>
                    </section>

                    <section className="mb-5">
                      <br />
                      <h2 className="mt-0 mb-15 text-uppercase font-sm">
                        3. Politique de Réservation
                      </h2>
                      <p>a. Champ d'application</p>
                      <p>
                        Les utilisateurs peuvent réserver des salles, des
                        restaurants ou des hôtels pour des événements personnels
                        ou professionnels. La disponibilité peut varier jusqu’à
                        confirmation officielle.
                      </p>

                      <p>b. Processus de réservation</p>
                      <p>
                        Toute réservation nécessite un acompte ou un paiement
                        complet, selon le lieu choisi. Une confirmation sera
                        envoyée après validation.
                      </p>

                      <p>c. Politique d'annulation</p>
                      <ul>
                        <li>
                          <p>
                            <strong>Plus de 7 jours</strong> avant l’événement :
                            remboursement complet
                          </p>
                        </li>
                        <li>
                          <p>
                            <strong>Entre 3 et 7 jours</strong> : remboursement
                            de 50 %
                          </p>
                        </li>
                        <li>
                          <p>
                            <strong>Moins de 3 jours</strong> : aucun
                            remboursement
                          </p>
                        </li>
                      </ul>
                      <p>
                        Les remboursements sont traités sous 7 à 10 jours
                        ouvrables.
                      </p>

                      <p>d. Responsabilités du client</p>
                      <p>
                        Le client est responsable de l’exactitude des
                        informations fournies et du respect des règles du lieu
                        réservé.
                      </p>
                    </section>

                    <section className="mb-5">
                      <br />
                      <h2 className="mt-0 mb-15 text-uppercase font-sm">
                        4. Politique de Planification d’Événements
                      </h2>
                      <p>a. Services proposés</p>
                      <p>
                        Comprend : consultation, coordination des prestataires,
                        décoration du lieu, gestion du personnel et supervision
                        le jour de l’événement.
                      </p>

                      <p>b. Paiements</p>
                      <p>
                        Un acompte de 50 % est exigé. Le solde doit être réglé{" "}
                        <strong>au moins 5 jours</strong> avant la date de
                        l’événement.
                      </p>

                      <p>c. Annulation et report</p>
                      <ul>
                        <li>
                          <p>
                            <strong>Plus de 14 jours</strong> avant :
                            remboursement de 75 % de l’acompte
                          </p>
                        </li>
                        <li>
                          <p>
                            <strong>Entre 7 et 14 jours</strong> : remboursement
                            de 50 %
                          </p>
                        </li>
                        <li>
                          <p>
                            <strong>Moins de 7 jours</strong> : aucun
                            remboursement
                          </p>
                        </li>
                      </ul>
                      <p>
                        Le report dépend de la disponibilité et peut entraîner
                        des frais.
                      </p>

                      <p>d. Responsabilité</p>
                      <p>
                        Nous ne sommes pas responsables des prestataires
                        externes non engagés via notre plateforme. En cas de
                        force majeure, un report ou un remboursement partiel
                        sera proposé.
                      </p>
                    </section>

                    <section className="mb-5">
                      <br />
                      <h2 className="mt-0 mb-15 text-uppercase font-sm">
                        5. Conditions Générales
                      </h2>
                      <p>a. Comportement de l’utilisateur</p>
                      <p>
                        Les utilisateurs doivent fournir des informations
                        exactes et utiliser la plateforme légalement. Toute
                        infraction peut entraîner la suspension du compte.
                      </p>

                      <p>b. Politique de confidentialité</p>
                      <p>
                        Les données personnelles sont traitées selon notre{" "}
                        <NavLink to="/Term">
                          politique de confidentialité
                        </NavLink>
                      </p>

                      <p>c. Règlement des litiges</p>
                      <p>
                        En cas de litige, contactez notre service client. Si
                        aucun accord n’est trouvé, les lois locales
                        s’appliqueront.
                      </p>
                    </section>

                    <section>
                      <h2 className="mt-0 mb-15 text-uppercase font-sm">
                        6. Informations de Contact
                      </h2>
                      <ul>
                        <li>
                          <p>
                            <strong>Email :</strong> {email}
                          </p>
                        </li>
                        <li>
                          <p>
                            <strong>Téléphone :</strong> {phoneNumber}
                          </p>
                        </li>
                        <li>
                          <p>
                            <strong>Adresse :</strong> [{address}]
                          </p>
                        </li>
                      </ul>
                    </section>
                  </div>
                  {/* End of display information */}
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}

export default Policy;
