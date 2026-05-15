import React from 'react';
import { motion } from 'motion/react';
import { Users } from 'lucide-react';

const VisitorBadge = ({ count }: { count: number | null }) => {
  if (count === null) return null;
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-6 left-6 z-[45] hidden sm:flex items-center gap-3 bg-neutral-900/80 backdrop-blur-md border border-white/10 rounded-2xl p-3 pr-4 shadow-2xl"
    >
      <div className="w-10 h-10 bg-brand/10 border border-brand/20 rounded-xl flex items-center justify-center">
        <Users className="w-5 h-5 text-brand" />
      </div>
      <div>
        <p className="text-[10px] font-black text-white/40 uppercase tracking-widest leading-none mb-1">Live Visitors</p>
        <p className="text-lg font-display font-bold text-white tracking-tighter leading-none">{count.toLocaleString()}</p>
      </div>
    </motion.div>
  );
};

export default VisitorBadge;
