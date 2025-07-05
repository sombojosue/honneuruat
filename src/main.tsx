import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Layout from "./pages/Layout";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Shop from "./pages/Shop";
import Search from "./pages/Search";
import Categorytype from "./pages/Categorytype";
import Details from "./pages/Details";
import Whitelist from "./pages/Whitelist";
import Cart from "./pages/Cart";
import App from "./pages/App";
import NotFound from "./pages/NotFound";
import PasswordAccount from "./pages/PasswordAccount";

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
        { path: "Shop", element: <Shop /> },
        { path: "Search", element: <Search /> },
        { path: "Categorytype", element: <Categorytype /> },
        { path: "Details", element: <Details /> },
        { path: "Whitelist", element: <Whitelist /> },
        { path: "Cart", element: <Cart /> },
        { path: "App", element: <App /> },
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
