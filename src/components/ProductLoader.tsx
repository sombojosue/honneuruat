// components/ProductSkeleton.tsx
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductLoader = () => {
  const loaderNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <div className="container">
      <div className="row product-grid-3">
        {loaderNumber.map((_, index) => (
          <div
            className="col-lg-3 col-md-4 col-sm-6 col-xs-6"
            key={index}
            style={{ marginBottom: "15px" }}
          >
            <div className="product-skeleton">
              <Skeleton height={200} borderRadius={12} width={"100%"} />
              <Skeleton height={28} width={70} style={{ marginTop: "12px" }} />
              <Skeleton width={"100%"} height={22} />
              {/* Price and cart section */}
              <div className="row mt-2 product-action-update">
                <div className="col-6 product-price">
                  <span>
                    <Skeleton width={70} height={22} />
                  </span>
                </div>

                <div className="col-6">
                  <Skeleton width={70} height={22} />
                </div>
              </div>
              {/* End of price and cart */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductLoader;
