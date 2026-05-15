import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { SERVICES_DATA } from '../constants/services';
import { CheckCircle2, ArrowLeft, Send } from 'lucide-react';
import { cloneElement, ReactElement } from 'react';

const ServiceDetailPage = () => {
  const { serviceId } = useParams();
  const service = SERVICES_DATA.find(s => s.id === serviceId);

  if (!service) {
    return (
      <div className="pt-32 text-center h-screen">
        <h1 className="text-4xl font-bold">Service Not Found</h1>
        <Link to="/" className="mt-8 inline-block text-brand font-bold uppercase tracking-widest text-xs">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <Link to="/" className="inline-flex items-center gap-2 text-neutral-400 hover:text-brand transition-colors font-bold uppercase tracking-widest text-[10px] mb-12">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-6 mb-10">
              <div className="w-20 h-20 brand-gradient rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-brand/30">
                {cloneElement(service.icon as ReactElement, { className: "w-10 h-10" })}
              </div>
              <div>
                <span className="text-[10px] font-black text-brand uppercase tracking-[0.3em] mb-1 block">Service Detail</span>
                <h1 className="text-4xl lg:text-5xl font-bold text-neutral-950 font-display">{service.title}</h1>
              </div>
            </div>

            <p className="text-xl text-neutral-500 leading-relaxed font-medium mb-12">
              {service.desc} Our approach centers on technical excellence and user-centric outcomes, ensuring sustainable growth for your digital ecosystem.
            </p>

            <div className="bg-neutral-50 rounded-[40px] p-10 border border-black/5">
                <h3 className="text-xl font-bold text-neutral-900 mb-8 flex items-center gap-2">
                    <CheckCircle2 className="w-6 h-6 text-brand" /> Core Capabilities
                </h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  {service.details.map((detail, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-brand/5 border border-brand/10 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3 h-3 text-brand" />
                      </div>
                      <span className="text-sm font-bold text-neutral-700 tracking-tight leading-tight">{detail}</span>
                    </div>
                  ))}
                </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:sticky lg:top-32"
          >
            <div className="bg-white border border-neutral-100 rounded-[40px] p-10 lg:p-12 text-neutral-900 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand/5 rounded-full blur-[80px]" />
              
              <h2 className="text-3xl font-bold mb-6 relative z-10 font-display">Get a <span className="text-brand">Custom Quote</span></h2>
              <p className="text-neutral-500 mb-10 relative z-10 font-medium leading-relaxed">Ready to take your {service.title} to the next level? Our experts are here to help you scope your project.</p>
              
              <div className="space-y-6 relative z-10">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 mb-2">Full Name</label>
                  <input type="text" className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/5 transition-all text-sm placeholder:text-neutral-300" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 mb-2">Email Address</label>
                  <input type="email" className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/5 transition-all text-sm placeholder:text-neutral-300" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 mb-2">Project Brief</label>
                  <textarea rows={4} className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/5 transition-all text-sm resize-none placeholder:text-neutral-300" placeholder="Tell us about your needs..."></textarea>
                </div>
                <button className="w-full brand-gradient py-5 rounded-2xl font-bold text-white flex items-center justify-center gap-3 hover:shadow-2xl hover:shadow-brand/30 transition-all uppercase tracking-[0.2em] text-[10px] mt-4">
                  Send Inquiry <Send className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-center gap-8 opacity-40">
                <div className="text-[10px] font-black tracking-widest uppercase text-neutral-400">Trusted By</div>
                <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-lg bg-neutral-200"></div>
                    <div className="w-8 h-8 rounded-lg bg-neutral-200"></div>
                    <div className="w-8 h-8 rounded-lg bg-neutral-200"></div>
                </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;
