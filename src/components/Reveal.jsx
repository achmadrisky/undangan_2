import { motion, useReducedMotion } from 'motion/react';

export const spring = { type: 'spring', stiffness: 100, damping: 20 };

// Memunculkan konten saat masuk layar: naik 24px dan memudar masuk (transform + opacity saja)
export default function Reveal({ children, delay = 0, className = '' }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ ...spring, delay }}
    >
      {children}
    </motion.div>
  );
}
