import { useEffect, useState } from "react";
import "../assets/css/main.css";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { phoneNumber, urlApp, urlAppApi } from "./Variables";
import { NavLink } from "react-router-dom";
import ReservationModal from "./ReservationModal";
import DetailLoader from "./DetailLoader";
import { email } from "./Variables";

// Types

type Subcategory = {
  Product_name: string;
  Picture: string;
  Price: number;
  Category_name: string;
  Product_id: number;
  Product_description: string;
  Category_id: number;
  product: string;
  Category_Name: string;
  images: string[];
  img: string;
  review_number: number;
};

// Sanitize function
const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[^a-zA-Z0-9@._-]/g, "")
    .replace(/@{2,}/g, "@")
    .replace(/\.{2,}/g, ".");
};

const ReservationData: React.FC = () => {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("q");

  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [categoryList, setCategoryList] = useState<Subcategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [banner, setBanner] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!categoryId) {
        setError("ID du produit manquant dans l’URL.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get<Subcategory[]>(
          `${urlAppApi}productdetail.php?query=${sanitizeInput(categoryId)}`
        );

        if (!response.data || response.data.length === 0) {
          setError(
            "Veuillez ne pas tenter de manipuler l’adresse URL. Toute tentative de modification non autorisée pourra entraîner une interruption de votre session ou un blocage d’accès."
          );
        } else {
          setSubcategories(response.data);
          setBanner(urlApp + response.data[0].Picture);
        }
      } catch (err) {
        setError(
          "l’identifiant du produit doit contenir uniquement des chiffres."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [categoryId]);

  useEffect(() => {
    const fetchCategoryList = async () => {
      try {
        const response = await axios.get<Subcategory[]>(
          `${urlAppApi}productcategorylist.php`
        );
        setCategoryList(response.data);
      } catch (err) {
        console.error("Failed to fetch category list", err);
      }
    };

    fetchCategoryList();
  }, []);

  if (loading) return <DetailLoader />;
  if (error) {
    return (
      <div className="container">
        <div className="row mt-3 mb-3">
          <div className="col-lg-12">
            <div className="alert alert-danger">
              <p>{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const product = subcategories[0];
  console.log(product);

  return (
    <>
      <section className="mt-50 mb-50">
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              <div className="product-detail accordion-detail">
                <div className="row mb-50">
                  <div className="col-md-6 col-sm-12 col-xs-12">
                    <div className="detail-gallery">
                      <div className="product-image-slider">
                        <figure className="border-radius-10">
                          <img
                            src={banner || ""}
                            alt="product image"
                            className="imgavatarChange"
                            style={{ width: "100%" }}
                          />
                        </figure>
                      </div>
                      <div>
                        {product.images.map((img, index) => (
                          <a
                            style={{ cursor: "pointer" }}
                            key={index}
                            onClick={() => setBanner(urlApp + img)}
                          >
                            <img
                              src={urlApp + img}
                              style={{ width: "65px", marginRight: "5px" }}
                              alt={`thumb-${index}`}
                            />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-12 col-xs-12">
                    <div className="detail-info">
                      <h2 className="title-detail">{product.Product_name}</h2>
                      <div className="product-detail-rating">
                        <div className="pro-details-brand">
                          <span>
                            {product.Price}: <a>Places</a>
                          </span>
                        </div>
                        <div className="product-rate-cover text-end">
                          <div className="product-rate d-inline-block">
                            <div
                              className="product-rating"
                              style={{ width: "90%" }}
                            ></div>
                          </div>
                          <span className="font-small ml-5 text-muted">
                            {/*product.review_numberre + `views`*/}
                          </span>
                        </div>
                      </div>

                      <div className="clearfix product-price-cover">
                        <div className="product-price primary-color float-left">
                          <ins>
                            <span className="text-brand" id="price-show">
                              {product.Price} $
                            </span>
                          </ins>
                        </div>
                      </div>

                      <div className="bt-1 border-color-1 mt-15 mb-15"></div>
                      <div className="short-desc mb-30">
                        {product.Product_description}
                      </div>
                      <div className="row">
                        <div className="row text-center">
                          <div className="col-6 md-6 d-flex gap-2">
                            {/* Telephone Icon */}
                            <a
                              href={`https://wa.me/${phoneNumber}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ color: "#4f5d77" }}
                            >
                              {/* WhatsApp Icon */}
                              <svg
                                width="20"
                                height="20"
                                fill="currentColor"
                                viewBox="0 0 32 32"
                              >
                                <path d="M16.004 2.002c-7.732 0-14 6.268-14 14 0 2.473.651 4.875 1.89 7.006l-1.984 7.203 7.395-1.938c2.058 1.114 4.386 1.73 6.699 1.73h.002c7.732 0 14-6.268 14-14s-6.268-14.001-14.002-14.001zm0 25.999h-.001c-2.014 0-3.987-.533-5.72-1.541l-.409-.24-4.386 1.15 1.166-4.28-.266-.438c-1.15-1.893-1.757-4.065-1.757-6.307 0-6.625 5.375-12 12-12s12.001 5.375 12.001 12-5.376 11.999-12.001 11.999zm6.412-8.396c-.353-.176-2.086-1.028-2.41-1.146-.323-.12-.558-.176-.792.176-.234.353-.91 1.145-1.115 1.38-.206.234-.411.265-.764.088-.353-.176-1.49-.549-2.836-1.754-1.047-.935-1.754-2.088-1.961-2.441-.206-.353-.022-.543.154-.718.158-.158.353-.411.529-.617.176-.206.234-.353.353-.588.117-.235.058-.441-.029-.617-.087-.176-.792-1.91-1.085-2.614-.285-.684-.575-.59-.792-.601l-.676-.012c-.235 0-.617.088-.941.441-.323.353-1.235 1.206-1.235 2.941 0 1.735 1.264 3.412 1.441 3.647.176.234 2.49 3.804 6.033 5.331.842.363 1.5.579 2.014.74.846.269 1.617.231 2.228.141.679-.101 2.086-.853 2.379-1.676.294-.823.294-1.529.206-1.676-.088-.147-.323-.235-.676-.411z" />
                              </svg>
                              <br />
                              &nbsp;
                              {phoneNumber}
                            </a>
                          </div>

                          <div className="col-6 md-6 d-flex gap-2">
                            {/* Email Icon */}
                            <a
                              href={`mailto:${email}`}
                              style={{ color: "#4f5d77" }}
                            >
                              <svg
                                width="20"
                                height="20"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 2v.01L12 13 4 6.01V6h16zM4 18V8.24l7.76 6.76a1 1 0 0 0 1.48 0L20 8.24V18H4z" />
                              </svg>
                              <br />
                              &nbsp;
                              {email}
                            </a>
                          </div>
                        </div>
                      </div>

                      <div className="bt-1 border-color-1 mt-30 mb-30"></div>
                      <div className="detail-extralink">
                        <div className="product-extra-link2">
                          <button
                            className="btn"
                            style={{ float: "right" }}
                            data-bs-toggle="modal"
                            data-bs-target="#myModalReservation"
                          >
                            Faire la réservation
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Tabs */}
                <div className="tab-style3">
                  <ul className="nav nav-tabs text-uppercase">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        data-bs-toggle="tab"
                        href="#Description"
                      >
                        Description
                      </a>
                    </li>
                    <li className="nav-item">
                      {/*<a
                      className="nav-link"
                      data-bs-toggle="tab"
                      href="#Reviews"
                    >
                      Reviews (0)
                    </a>
*/}
                    </li>
                  </ul>
                  <div className="tab-content shop_info_tab entry-main-content">
                    <div className="tab-pane fade show active" id="Description">
                      {product.Product_description}
                    </div>
                    <div className="tab-pane fade" id="Reviews">
                      {/* Review Form Here */}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3 primary-sidebar sticky-sidebar">
              <div className="widget-category mb-30">
                <h5 className="section-title style-1 mb-30 wow fadeIn animated">
                  Catégories
                </h5>
                <ul className="categories">
                  {categoryList.map((cat) => (
                    <li key={cat.Category_id}>
                      <NavLink to={`/Categorytype?q=${cat.Category_Name}`}>
                        {cat.Category_Name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ReservationModal
        id="myModalReservation"
        title="Faire la réservation"
        body={`${product.Product_id}`}
      />
    </>
  );
};

export default ReservationData;
