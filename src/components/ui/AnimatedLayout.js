"use client";

import { motion } from "framer-motion";

export default function AnimatedLayout({ children }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {children}
    </motion.div>
  );
}