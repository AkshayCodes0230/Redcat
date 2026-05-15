import React from 'react';
import { motion } from 'motion/react';

const LoadingScreen = () => {
  return (
    <motion.div 
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-white flex items-center justify-center p-6"
    >
      <div className="text-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="w-16 h-16 border-2 border-brand border-t-black/10 rounded-full mx-auto mb-6"
        />
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xl font-display font-bold tracking-widest uppercase italic text-neutral-900"
        >
          Redcat<span className="text-brand">IT</span>
        </motion.p>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
