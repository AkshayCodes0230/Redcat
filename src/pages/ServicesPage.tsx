import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { SERVICES_DATA } from '../constants/services';
import { ChevronRight } from 'lucide-react';
import { cloneElement, ReactElement } from 'react';

const ServicesPage = () => {
  return (
    <div className="pt-32 pb-24 bg-neutral-50/30 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-brand font-bold uppercase tracking-[0.2em] mb-4 block">Our Full Suite</span>
          <h1 className="text-5xl lg:text-7xl font-extrabold mb-8 text-neutral-950 font-display">Specialized IT Solutions</h1>
          <p className="text-neutral-500 max-w-2xl mx-auto text-lg font-medium">
            From design to enterprise-scale deployment, we offer a complete ecosystem of technical services.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white border border-black/5 p-10 rounded-[40px] relative group overflow-hidden shadow-sm hover:shadow-2xl transition-all"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="w-16 h-16 bg-neutral-900 text-brand rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-black/10 group-hover:brand-gradient group-hover:text-white transition-all">
                {cloneElement(service.icon as ReactElement, { className: "w-8 h-8" })}
              </div>
              
              <h3 className="text-2xl font-bold mb-4 text-neutral-900 group-hover:text-brand transition-colors">{service.title}</h3>
              <p className="text-neutral-500 leading-relaxed font-bold uppercase tracking-widest text-[10px] opacity-50 mb-6">Expertise Tier 01</p>
              
              <p className="text-neutral-600 leading-relaxed mb-10 text-sm font-medium">
                {service.desc}
              </p>
              
              <Link 
                to={`/services/${service.id}`}
                className="inline-flex items-center gap-3 text-brand font-black uppercase tracking-[0.2em] text-[10px] group/btn transition-all no-underline"
              >
                Explore Details <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
