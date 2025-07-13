import { useEffect, useState } from "react";
import { useCart } from "./CartContext";
import "../assets/css/main.css";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { urlApp } from "./Variables";
import { NavLink } from "react-router-dom";
import DetailLoader from "./DetailLoader";

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

const DetailsData: React.FC = () => {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("q");
  const [qtyValue, setqtyValue] = useState(1);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [categoryList, setCategoryList] = useState<Subcategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [banner, setBanner] = useState<string | null>(null);
  const { addToCart } = useCart();
  const [successIds, setSuccessIds] = useState<number[]>([]); // ✅ track success products

  const qtyDown = () => {
    if (qtyValue > 1) {
      setqtyValue(qtyValue - 1);
    }
  };

  const qtyUp = () => {
    setqtyValue(qtyValue + 1);
  };

  useEffect(() => {
    const fetchDetails = async () => {
      if (!categoryId) {
        setError("ID du produit manquant dans l’URL.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get<Subcategory[]>(
          `${urlApp}productdetail.php?query=${sanitizeInput(categoryId)}`
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
          `${urlApp}productcategorylist.php`
        );
        setCategoryList(response.data);
      } catch (err) {
        console.error("Failed to fetch category list", err);
      }
    };

    fetchCategoryList();
  }, []);

  const handleAddToCart = async (product: Subcategory) => {
    const updateQty = qtyValue;
    try {
      const result = await addToCart({
        id: product.Product_id,
        name: product.Product_name,
        price: product.Price,
        qty: updateQty,
        avatar: product.Picture,
      });

      // ✅ Only update icon when PHP API says success
      if (result === true) {
        setSuccessIds((prev) => [...prev, product.Product_id]);
        setMessage("✅ Votre item a été ajouté au panier avec succès.");
        // Optional: revert icon after 2 seconds
        setTimeout(() => {
          setSuccessIds((prev) =>
            prev.filter((id) => id !== product.Product_id)
          );
          setMessage("");
        }, 10000);
      }
    } catch (err) {
      console.error("Erreur panier:", err);
    }
  };

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
                          Brands: <a>Honneur</a>
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
                    <div className="bt-1 border-color-1 mt-30 mb-30"></div>
                    <div className="detail-extralink">
                      <div className="detail-qty border radius">
                        <a
                          href="#"
                          className="qty-down"
                          onClick={(e) => {
                            e.preventDefault();
                            qtyDown();
                          }}
                        >
                          <i className="fi-rs-angle-small-down"></i>
                        </a>
                        <span className="qty-val">{qtyValue}</span>
                        <a
                          href="#"
                          className="qty-up"
                          onClick={(e) => {
                            e.preventDefault();
                            qtyUp();
                          }}
                        >
                          <i className="fi-rs-angle-small-up"></i>
                        </a>
                      </div>
                      <div className="product-extra-link2">
                        <button
                          className="btn"
                          style={{ float: "right" }}
                          onClick={() => handleAddToCart(product)}
                        >
                          ajouter&nbsp;
                          <i
                            style={{ marginTop: "15px" }}
                            className={
                              successIds.includes(product.Product_id)
                                ? "fi-rs-check"
                                : "fi-rs-shopping-bag-add"
                            }
                          ></i>
                        </button>
                      </div>
                    </div>
                    {message && (
                      <div className="alert alert-success" role="alert">
                        {message}
                      </div>
                    )}
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
  );
};

export default DetailsData;
