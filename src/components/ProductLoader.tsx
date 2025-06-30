// components/ProductSkeleton.tsx
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductLoader = () => {
  const loaderNumber = [1, 2, 3, 4, 5, 6];

  return (
    <div className="container">
      <div className="row product-grid-3">
        {loaderNumber.map((_, index) => (
          <div
            className="col-lg-4 col-md-4 col-sm-6 col-xs-6"
            key={index}
            style={{ marginBottom: "15px" }}
          >
            <div className="product-skeleton">
              <Skeleton height={200} borderRadius={12} width={"100%"} />
              <Skeleton
                height={28}
                style={{ marginTop: "12px", width: "90%" }}
              />
              <Skeleton width={"80%"} height={22} />
              <Skeleton width={"80%"} height={22} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductLoader;
