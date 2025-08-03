import React from 'react';
import { motion } from 'framer-motion';

interface SafeMagneticButtonProps {
  children: React.ReactNode;
  className?: string;
}

export function SafeMagneticButton({ children, className = '' }: SafeMagneticButtonProps) {
  return (
    <motion.div
      className={`inline-block cursor-pointer ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      {children}
    </motion.div>
  );
}