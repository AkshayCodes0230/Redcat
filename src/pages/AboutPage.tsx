import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Users, Zap, ShieldCheck } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="pt-32 pb-24">
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -top-10 -left-10 w-40 h-40 brand-gradient rounded-full blur-[80px] opacity-20" />
              <span className="text-brand font-bold uppercase tracking-[0.2em] mb-4 block">About Our Company</span>
              <h1 className="text-5xl lg:text-7xl font-extrabold mb-8 text-neutral-950 leading-tight">Engineering Digital Success with Passion.</h1>
              <p className="text-neutral-500 mb-8 leading-relaxed text-xl font-medium">
                Redcat IT Solutions was born from a vision to bridge the gap between complex engineering and elegant business solutions. Today, we are a leading technology partner for global enterprises and ambitious startups alike.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6 mb-10">
                {[
                  { title: "Our Vision", text: "To be the catalyst for digital evolution globally." },
                  { title: "Our Mission", text: "Empowering businesses through technical excellence." }
                ].map((item, i) => (
                  <div key={i} className="p-6 bg-neutral-50 rounded-2xl border border-black/5">
                    <h4 className="font-bold text-neutral-900 mb-2">{item.title}</h4>
                    <p className="text-sm text-neutral-500 leading-relaxed font-medium">{item.text}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                {[
                  "Web & Mobile Ecosystems",
                  "Advanced AI & Machine Learning",
                  "Scalable Cloud Infrastructure",
                  "Cybersecurity & Data Privacy"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 group">
                    <div className="w-6 h-6 rounded-full bg-brand/5 border border-brand/10 flex items-center justify-center group-hover:bg-brand transition-colors">
                      <CheckCircle2 className="w-4 h-4 text-brand group-hover:text-white transition-colors" />
                    </div>
                    <span className="font-bold text-neutral-700 uppercase tracking-widest text-[10px]">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-2 gap-6"
            >
              <div className="space-y-6 mt-12">
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=400" alt="Team" className="rounded-3xl h-96 object-cover w-full shadow-2xl" />
                <div className="bg-white text-neutral-900 p-8 rounded-3xl border border-neutral-100 shadow-xl">
                  <h4 className="text-4xl font-bold text-brand mb-1">98%</h4>
                  <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Client retention rate</p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-brand text-white p-8 rounded-3xl shadow-xl shadow-brand/20">
                  <Users className="w-10 h-10 text-white mb-4" />
                  <h4 className="text-xl font-bold mb-1">Diverse Talent</h4>
                  <p className="text-xs font-bold text-white/70 uppercase tracking-widest">Experts from 12+ countries</p>
                </div>
                <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=400" alt="Meeting" className="rounded-3xl h-96 object-cover w-full shadow-2xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-neutral-50 border-y border-neutral-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
             {[
               { icon: <Zap />, title: "Innovation", desc: "Always pushing boundaries." },
               { icon: <ShieldCheck />, title: "Integrity", desc: "Honest, transparent partnerships." },
               { icon: <Users />, title: "Collaboration", desc: "Your goals are our shared mission." },
               { icon: <CheckCircle2 />, title: "Quality", desc: "Uncompromising code standards." }
             ].map((value, i) => (
               <div key={i} className="text-center group">
                 <div className="w-16 h-16 rounded-2xl bg-white border border-neutral-200 shadow-sm flex items-center justify-center mx-auto mb-6 group-hover:bg-brand group-hover:border-brand transition-all duration-300">
                    <div className="text-brand group-hover:text-white transition-colors">{value.icon}</div>
                 </div>
                 <h4 className="text-xl font-bold mb-2 text-neutral-900">{value.title}</h4>
                 <p className="text-neutral-500 text-sm font-medium">{value.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
