import React from "react";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";

type FlutterwaveProps = {
  amount: number;
  email: string;
  name: string;
  phone: string;
};

const FlutterwavePayment: React.FC<FlutterwaveProps> = ({
  amount,
  email,
  name,
  phone,
}) => {
  const config = {
    public_key: "FLWPUBK_TEST-65a26393-f508-4549-b278-7f7a50f0529f",
    tx_ref: Date.now().toString(),
    amount: amount,
    currency: "USD",
    payment_options: "card,ussd,banktransfer",
    customer: {
      email: email,
      name: name,
      phone_number: phone, // ✅ Required field
    },
    customizations: {
      title: "Honneur Platform",
      description: "Paiement des articles dans le panier",
      logo: "https://inovsell.com/assets/imgs/theme/logoone.png",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  return (
    <button
      className="btn btn-sm"
      onClick={() => {
        handleFlutterPayment({
          callback: (response) => {
            console.log("Payment response", response);
            closePaymentModal(); // Close modal after payment
          },
          onClose: () => {
            console.log("Payment closed");
          },
        });
      }}
    >
      Payer maintenant
    </button>
  );
};

export default FlutterwavePayment;
