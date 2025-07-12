import { useEffect, useState } from "react";
import "../assets/css/main.css";
import { urlApp } from "./Variables";
import Modal from "./Modal";
import PaymentModal from "./PaymentModal";
import { useCart } from "./CartContext";

type Product = {
  cart_product_name: string;
  cart_product_avatar: string;
  cart_price: number;
  Category_name: string;
  cart_qty: number;
  cart_id: number;
};

function Product() {
  const [data, setData] = useState<Product[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    if (userEmail) {
      setIsLoggedIn(true);
      fetch(`${urlApp}productcart.php?u=${userEmail}`)
        .then((res) => res.json())
        .then((jsonData) => setData(jsonData))
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [userEmail]);

  const calculateSubtotal = (product: Product) =>
    product.cart_price * product.cart_qty;

  const total = data.reduce(
    (sum, item) => sum + item.cart_price * item.cart_qty,
    0
  );

  const { removeFromCart } = useCart();
  const handleRemoveToCart = async (itemId: number) => {
    const success = await removeFromCart(itemId);
    if (success) {
      // ✅ Update local state to remove the product row visually
      setData((prevData) => prevData.filter((item) => item.cart_id !== itemId));
    }
  };

  if (!isLoggedIn) {
    return (
      <>
        <div className="container">
          <div className="row mb-5 p-5">
            <div className="col-12">
              <div className="shop-product-fillter">
                <div className="totall-product">
                  <p>
                    Désolé, vous devez vous connecter{" "}
                    <strong>pour voir vos items</strong>
                  </p>
                  <p>
                    <a
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      href="#"
                    >
                      Connectez-vous ici &rarr;
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal
          id="exampleModal"
          title="Se connecter"
          body="Ceci est le contenu de la modal Bootstrap."
        />
      </>
    );
  }

  return (
    <>
      <section className="mt-50 mb-50">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="table-responsive">
                <table className="table shopping-summery text-center clean">
                  <thead>
                    <tr className="main-heading">
                      <th>Image</th>
                      <th>Nom</th>
                      <th>Prix</th>
                      <th>Qty</th>
                      <th>Sous-total</th>
                      <th>Supprimer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((product, index) => (
                      <tr key={index}>
                        <td className="image product-thumbnail">
                          <img
                            src={urlApp + product.cart_product_avatar}
                            alt={product.cart_product_name}
                          />
                        </td>
                        <td className="product-des product-name">
                          <h5>{product.cart_product_name}</h5>
                        </td>
                        <td className="price">{product.cart_price}$</td>
                        <td className="text-center">
                          <div className="detail-qty border radius m-auto">
                            <span className="qty-val">{product.cart_qty}</span>
                          </div>
                        </td>
                        <td className="text-right">
                          {calculateSubtotal(product)}$
                        </td>
                        <td className="action text-muted">
                          <i
                            onClick={() => handleRemoveToCart(product.cart_id)}
                            className="fi-rs-trash"
                            style={{ cursor: "pointer" }}
                          ></i>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="divider center_icon mt-50 mb-50">
                <i className="fi-rs-fingerprint"></i>
              </div>

              <div className="row mb-50">
                <div className="col-lg-6">
                  <div className="mb-30 mt-50">
                    <h4 className="mb-3">Appliquer un coupon</h4>
                    <form>
                      <div className="form-row row justify-content-center">
                        <div className="form-group col-lg-6">
                          <input
                            type="text"
                            className="font-medium"
                            name="Coupon"
                            placeholder="Entrez votre coupon"
                          />
                        </div>
                        <div className="form-group col-lg-6">
                          <button className="btn btn-sm" type="submit">
                            <i className="fi-rs-label mr-10"></i> Vérifier
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="border p-md-4 p-30 border-radius cart-totals">
                    <h4 className="mb-3">Total du panier</h4>
                    <table className="table">
                      <tbody>
                        <tr>
                          <td>Sous-total</td>
                          <td>
                            <strong>{total}$</strong>
                          </td>
                        </tr>
                        <tr>
                          <td>Livraison</td>
                          <td>
                            <i className="ti-gift mr-5"></i> Livraison gratuite
                          </td>
                        </tr>
                        <tr>
                          <td>Total</td>
                          <td>
                            <strong className="text-brand">{total}$</strong>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="form-group col-lg-6">
                      {total > 0 && (
                        <div className="form-group col-lg-6">
                          <button
                            className="btn btn-sm"
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#myModalPayment"
                          >
                            <i className="fi-rs-money mr-10"></i> Pay
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PaymentModal id="myModalPayment" title="Paiement" total={total} />
    </>
  );
}

export default Product;
