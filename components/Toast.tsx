import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Toast: React.FC<{ message: string; show: boolean }> = ({ message, show }) => (
  <AnimatePresence>
    {show && (
      <motion.div
        initial={{ opacity: 0, y: -40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -40, scale: 0.95 }}
        transition={{ duration: 0.4 }}
        className="fixed top-8 left-1/2 -translate-x-1/2 bg-gradient-to-br from-green-400/80 to-teal-500/80 backdrop-blur-lg text-white px-8 py-3 rounded-xl shadow-2xl z-50"
        role="alert"
        aria-live="polite"
      >
        {message}
      </motion.div>
    )}
  </AnimatePresence>
);

export default Toast;