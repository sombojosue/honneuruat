// components/ProductSkeleton.tsx
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DetailLoader = () => {
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
                        <Skeleton
                          height={300}
                          borderRadius={12}
                          width={"100%"}
                        />
                      </figure>
                    </div>
                    <div></div>
                  </div>
                </div>
                <div className="col-md-6 col-sm-12 col-xs-12">
                  <div className="detail-info">
                    <h2 className="title-detail">
                      <Skeleton
                        height={28}
                        style={{
                          marginTop: "12px",
                          width: "100%",
                          height: "150px",
                        }}
                      />
                    </h2>
                    <div className="product-detail-rating">
                      <div className="pro-details-brand">
                        <span className="detail-qty">
                          <Skeleton width={"100%"} height={22} />
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
                        <span className="detail-qty">
                          <Skeleton width={"100%"} height={22} />
                        </span>
                      </div>
                    </div>
                    <div className="bt-1 border-color-1 mt-15 mb-15"></div>
                    <div className="short-desc mb-30">
                      <Skeleton
                        height={28}
                        style={{
                          marginTop: "12px",
                          width: "100%",
                          height: "150px",
                        }}
                      />
                    </div>
                    <div className="bt-1 border-color-1 mt-30 mb-30"></div>
                    <div className="detail-extralink">
                      <div className="detail-qty border radius">
                        <span>
                          <Skeleton width={"80%"} height={22} />
                        </span>
                      </div>
                      <div className="detail-qty border radius">
                        <span>
                          <Skeleton width={"80%"} height={22} />
                        </span>
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
                      <Skeleton
                        height={28}
                        style={{
                          marginTop: "12px",
                          width: "100%",
                          height: "150px",
                        }}
                      />
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
                    <Skeleton
                      height={28}
                      style={{
                        marginTop: "12px",
                        width: "100%",
                        height: "150px",
                      }}
                    />
                  </div>
                  <br />
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
                <li>
                  <Skeleton height={28} width={"100%"} />
                </li>
                <li>
                  <Skeleton height={28} width={"100%"} />
                </li>
                <li>
                  <Skeleton height={28} width={"100%"} />
                </li>
                <li>
                  <Skeleton height={28} width={"100%"} />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailLoader;
