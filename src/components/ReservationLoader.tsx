// components/ProductSkeleton.tsx
import { useLocation } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductLoader = () => {
  const loaderNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const location = useLocation();
  const isIndex = location.pathname === "/";
  const className = isIndex
    ? "col-lg-3 col-md-4 col-sm-6 col-xs-6"
    : "col-lg-4 col-md-4 col-sm-6 col-xs-6";

  return (
    <div className="container">
      <div className="row product-grid-3">
        {loaderNumber.map((_, index) => (
          <div
            className={className}
            key={index}
            style={{ marginBottom: "15px" }}
          >
            <div className="product-skeleton">
              <Skeleton height={200} borderRadius={12} width={"100%"} />
              <br />
              <Skeleton width={"100%"} height={22} />
              <br />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductLoader;
