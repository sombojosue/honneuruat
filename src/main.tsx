import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Layout from "./pages/Layout";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Collections from "./pages/Collections";
import Search from "./pages/Search";
import Categorytype from "./pages/Categorytype";
import Details from "./pages/Details";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import App from "./pages/App";
import NotFound from "./pages/NotFound";
import PasswordAccount from "./pages/PasswordAccount";
import Term from "./pages/Term";
import Policy from "./pages/Policy";
import Reservation from "./pages/Reservation";
import ReservationDetails from "./pages/ReservationDetails";

import "./index.css";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Index /> },
        { path: "About", element: <About /> },
        { path: "Contact", element: <Contact /> },
        { path: "Collections", element: <Collections /> },
        { path: "Search", element: <Search /> },
        { path: "Categorytype", element: <Categorytype /> },
        { path: "Details", element: <Details /> },
        { path: "Wishlist", element: <Wishlist /> },
        { path: "Cart", element: <Cart /> },
        { path: "App", element: <App /> },
        { path: "Reservation", element: <Reservation /> },
        { path: "Term", element: <Term /> },
        { path: "Policy", element: <Policy /> },
        { path: "ReservationDetails", element: <ReservationDetails /> },
        { path: "PasswordAccount", element: <PasswordAccount /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ],
  {
    basename: "/honneuruat/",
  }
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
