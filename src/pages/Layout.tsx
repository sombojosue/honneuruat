import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const Layout = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        style={{ overflowX: "hidden" }} // 👈 prevents horizontal scroll
      >
        <Outlet /> {/* 👈 REQUIRED to render child routes */}
      </motion.div>
    </AnimatePresence>
  );
};

export default Layout;
