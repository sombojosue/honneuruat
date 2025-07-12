import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { urlApp } from "./Variables";

export type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  qty: number;
  avatar: string;
};

type CartContextType = {
  cart: CartItem[];
  totalItems: number;
  addToCart: (item: Omit<CartItem, "quantity">) => Promise<boolean>;
  removeFromCart: (itemId: number) => Promise<boolean>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);

  useEffect(() => {
    const fetchInitialCartCount = async () => {
      const usertoken = localStorage.getItem("userToken");
      const email = localStorage.getItem("userEmail");

      if (!usertoken) {
        console.warn("No token, skipping cart fetch.");
        return;
      }

      try {
        const res = await fetch(
          `${urlApp}productgetcartcount.php?token=${usertoken}&email=${email}`
        );

        const text = await res.text();
        console.log("Raw response from API:", text); // ✅ Debug raw response

        const data = JSON.parse(text);
        if (data.success) {
          console.log("Setting totalItems:", data.totalItems); // ✅ Debug value
          setTotalItems(data.totalItems);
        } else {
          console.warn("Cart count API error:", data.message);
        }
      } catch (err) {
        console.error("Error loading cart count:", err);
      }
    };

    fetchInitialCartCount();
  }, []);

  const addToCart = async (
    item: Omit<CartItem, "quantity">
  ): Promise<boolean> => {
    const userId = localStorage.getItem("userToken");
    const email = localStorage.getItem("userEmail");

    if (!userId) {
      alert("Merci de vous connecter avant de continuer.");
      return false;
    }

    const endpoint = `${urlApp}productcartinsert.php`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          email,
          productId: item.id,
          qty: item.qty,
          name: item.name,
          price: item.price,
          avatar: item.avatar,
        }),
      });

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        alert("Erreur serveur : réponse non valide.");
        return false;
      }

      if (data.success || data.message === "Existed item") {
        setCart((prev) => {
          const existing = prev.find((i) => i.id === item.id);
          if (existing) {
            return prev.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            );
          }
          return [...prev, { ...item, quantity: 1 }];
        });

        if (data.message !== "Existed item") {
          setTotalItems((prev) => prev + 1); // ✅ increment after add
        }

        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Erreur réseau:", error);
      alert("Erreur réseau lors de l'ajout au panier.");
      return false;
    }
  };

  const removeFromCart = async (itemId: number): Promise<boolean> => {
    const userId = localStorage.getItem("userToken");
    const email = localStorage.getItem("userEmail");

    if (!userId || !email) {
      alert("Merci de vous connecter pour continuer.");
      return false;
    }

    try {
      const response = await fetch(`${urlApp}productcartremove.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          item_id: itemId.toString(),
          user_id: userId,
        }),
      });

      const result = await response.json();

      if (result.success) {
        // ✅ Remove from local state
        setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));

        // ✅ Decrement total count
        setTotalItems((prev) => (prev > 0 ? prev - 1 : 0));

        return true;
      } else {
        alert("Erreur: " + result.message);
        return false;
      }
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      alert("Erreur réseau.");
      return false;
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, totalItems, addToCart, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
