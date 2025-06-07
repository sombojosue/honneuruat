import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Index from "./pages/Index.tsx";
import Contact from "./pages/Contact.tsx";
import About from "./pages/About.tsx";
import Shop from "./pages/Shop.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },

  {
    path: "/About",
    element: <About />,
  },
  {
    path: "/Contact",
    element: <Contact />,
  },
  {
    path: "/Shop",
    element: <Shop />,
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
