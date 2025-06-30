import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "../assets/css/main.css";
import { urlApp } from "./Variables";
import ProductLoaderHome from "./ProductLoaderHome";

type Product = {
  Product_name: string;
  Picture: string;
  Price: number;
  Category_name: string;
  Product_id: number;
};

const ITEMS_PER_PAGE = 8;

function Product() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);

  // UseRef to hold the latest page value
  const pageRef = useRef(page);

  useEffect(() => {
    pageRef.current = page;
  }, [page]);

  const fetchProducts = async (currentPage: number) => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await axios.get<Product[]>(
        `${urlApp}productslazy.php/products?page=${currentPage}&limit=${ITEMS_PER_PAGE}`
      );

      const newProducts = response.data;

      // Filter duplicates by Product_id
      const existingIds = new Set(products.map((p) => p.Product_id));
      const uniqueNew = newProducts.filter(
        (p) => !existingIds.has(p.Product_id)
      );

      setProducts((prev) => [...prev, ...uniqueNew]);

      if (newProducts.length < ITEMS_PER_PAGE) {
        setHasMore(false);
      } else {
        setPage((prev) => prev + 1); // Increment for next fetch
      }
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchProducts(1);
  }, []);

  // Lazy loading observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          fetchProducts(pageRef.current);
        }
      },
      { threshold: 1.0 }
    );

    const current = loaderRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [hasMore, loading]);

  return (
    <>
      {products.map((product) => (
        <div
          className="col-lg-3 col-md-4 col-sm-6 col-xs-6"
          key={product.Product_id}
        >
          <div className="product-cart-wrap mb-30">
            <div className="product-img-action-wrap">
              <div className="product-img product-img-zoom">
                <NavLink to={`/Details?q=${product.Product_id}`}>
                  <img
                    className="default-img resizeimg"
                    src={`${urlApp}${product.Picture}`}
                    alt={product.Product_name}
                  />
                  <img
                    className="hover-img resizeimg"
                    src={`${urlApp}${product.Picture}`}
                    alt={`${product.Product_name} hover`}
                  />
                </NavLink>
              </div>
              <div className="product-action-1">
                <button
                  className="action-btn hover-up"
                  aria-label="Aperçu rapide"
                >
                  <i className="fi-rs-eye"></i>
                </button>
                <button
                  className="action-btn hover-up"
                  aria-label="Ajouter à la Wishlist"
                >
                  <i className="fi-rs-heart"></i>
                </button>
              </div>
            </div>

            <div className="product-content-wrap">
              <div className="product-category">
                <NavLink to={`/Categorytype?q=${product.Category_name}`}>
                  {product.Category_name}
                </NavLink>
              </div>
              <h2>
                <NavLink to={`/Details?q=${product.Product_id}`}>
                  {product.Product_name}
                </NavLink>
              </h2>
              <div className="product-price">
                <span>{product.Price}$</span>
              </div>
              <div className="product-action-1 show">
                <button
                  className="action-btn hover-up"
                  aria-label="Ajouter au panier"
                >
                  <i className="fi-rs-shopping-bag-add"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div ref={loaderRef} className="text-center mt-4 mb-4">
        {loading && <ProductLoaderHome />}
        {!hasMore && (
          <p className="text-muted">Tous les produits sont affichés.</p>
        )}
      </div>
    </>
  );
}

export default Product;
