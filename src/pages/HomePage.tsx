import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  Star, 
  Zap, 
  ShieldCheck, 
  CheckCircle2, 
  Users, 
  ExternalLink, 
  Linkedin, 
  Twitter, 
  Github, 
  Target, 
  Rocket, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowRight,
  Code2,
  MousePointer2,
  Smartphone,
  Palette,
  MessageSquare,
  Cpu
} from 'lucide-react';
import { Map, Marker, Overlay } from 'pigeon-maps';
import { Link } from 'react-router-dom';
import { SERVICES_DATA, SERVICE_MAPPING } from '../constants/services';
import { useEffect, useState, cloneElement, ReactElement } from 'react';

const Counter = ({ value }: { value: number }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [value]);

  return <span>{count}</span>;
};

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-rose-500/10 rounded-full blur-[120px]" />
      
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/5 border border-brand/10 text-xs font-bold text-brand mb-6">
            <span className="w-2 h-2 bg-brand rounded-full animate-pulse" />
            AI-POWERED IT SOLUTIONS
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold mb-6 leading-[0.95] text-neutral-950">
            Innovative <span className="text-gradient">IT Solutions</span><br />for Modern Business
          </h1>
          <p className="text-lg text-neutral-500 mb-10 max-w-lg leading-relaxed font-medium">
            Specializing in AI solutions, cloud infrastructure, and enterprise-grade software development to scale your vision.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/services/software-dev" className="px-10 py-4 brand-gradient text-white rounded-xl font-bold hover:scale-105 transition-all flex items-center gap-2 group/btn shadow-xl shadow-brand/20">
              Our Portfolio <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
            <Link to="/services" className="px-10 py-4 bg-transparent border border-neutral-200 text-neutral-900 rounded-xl font-bold hover:bg-neutral-50 transition-all text-center">
              View Services
            </Link>
          </div>
          
          <div className="mt-12 flex items-center gap-6">
            <div className="flex -space-x-3">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-neutral-100 overflow-hidden shadow-sm">
                  <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                </div>
              ))}
            </div>
            <div className="text-sm">
              <div className="flex text-amber-400 gap-0.5 mb-1">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
              </div>
              <p className="text-neutral-400">Trusted by <span className="text-neutral-900 font-bold">500+</span> companies worldwide</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative"
        >
          <div className="relative z-10 glass p-4 rounded-3xl overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000" 
              alt="Technology" 
              className="rounded-2xl grayscale hover:grayscale-0 transition-all duration-700 w-full h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-grid-white/[0.05] pointer-events-none" />
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="absolute top-10 -left-6 glass p-4 rounded-2xl flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-brand/20 rounded-full flex items-center justify-center">
                <Zap className="text-brand w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-white/50">Speed</p>
                <p className="font-bold">Lightning Fast</p>
              </div>
            </motion.div>
            
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 4, delay: 0.5 }}
              className="absolute bottom-10 -right-6 glass p-4 rounded-2xl flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-rose-500/20 rounded-full flex items-center justify-center">
                <ShieldCheck className="text-rose-500 w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-white/50">Security</p>
                <p className="font-bold">Enterprise Grade</p>
              </div>
            </motion.div>
          </div>
          <div className="absolute -inset-4 border border-brand/20 rounded-[40px] -z-10" />
        </motion.div>
      </div>
    </section>
  );
};

const StatsBar = () => {
  const stats = [
    { label: 'Projects Completed', value: 250, suffix: '+' },
    { label: 'Happy Clients', value: 120, suffix: '+' },
    { label: 'Years Experience', value: 8, suffix: '+' },
    { label: 'Team Members', value: 45, suffix: '' },
  ];

  return (
    <div className="bg-neutral-50 py-16 border-y border-black/5">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="text-center"
          >
            <div className="text-4xl lg:text-5xl font-display font-bold mb-2 flex justify-center items-baseline text-brand drop-shadow-sm">
              <Counter value={stat.value} />
              <span className="text-brand font-bold">{stat.suffix}</span>
            </div>
            <p className="text-neutral-500 text-xs font-bold uppercase tracking-[0.2em]">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 bg-neutral-50/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-brand font-bold uppercase tracking-[0.2em] mb-4 block">Our Expertise</span>
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-neutral-950">Empowering Your Core Business</h2>
          <p className="text-neutral-500 max-w-2xl mx-auto">
            From design to deployment, we offer end-to-end IT services tailored to the unique challenges of your industry.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.slice(0, 6).map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white border border-black/5 p-8 rounded-3xl relative group overflow-hidden shadow-sm hover:shadow-xl transition-all"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className={`w-14 h-14 ${idx % 2 === 0 ? 'brand-gradient shadow-lg shadow-brand/20' : 'bg-neutral-50 border border-brand/10'} rounded-2xl flex items-center justify-center mb-6`}>
                {cloneElement(service.icon as ReactElement, { className: `w-7 h-7 ${idx % 2 === 0 ? 'text-white' : 'text-brand'}` })}
              </div>
              
              <h3 className="text-2xl font-bold mb-4 text-neutral-900">{service.title}</h3>
              <p className="text-neutral-500 leading-relaxed transition-colors group-hover:text-neutral-700 mb-6">
                {service.desc}
              </p>
              
              <Link 
                to={`/services/${service.id}`}
                className="mt-auto flex items-center gap-2 text-brand font-bold group/btn text-sm tracking-wider cursor-pointer"
              >
                LEARN MORE <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
            <Link to="/services" className="px-10 py-4 brand-gradient text-white rounded-xl font-bold hover:scale-105 transition-all inline-flex items-center gap-2 group/btn shadow-xl shadow-brand/20">
              View All Services <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
        </div>
      </div>
    </section>
  );
};

const Clients = () => {
  const clients = ['TechNova', 'SkyEdge', 'FinCore', 'NexaSoft', 'Alpha Systems', 'CloudSync'];
  
  return (
    <section className="py-20 border-b border-black/5">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-neutral-400 text-xs font-bold uppercase tracking-[0.3em] mb-12">Clients Worked With</p>
        
        <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-10 opacity-70">
          {clients.map((client, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ opacity: 1, scale: 1.1 }}
              className="flex items-center gap-3 cursor-default"
            >
              <div className="w-8 h-8 rounded-md bg-neutral-50 flex items-center justify-center border border-black/5 shadow-sm">
                <div className="w-4 h-4 bg-neutral-300 rounded-sm" />
              </div>
              <span className="text-xl font-display font-bold tracking-tight text-neutral-800">{client}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Team = () => {
  const team = [
    {
      name: 'Alex Redcat',
      role: 'CEO & Founder',
      desc: 'Tech visionary with 15+ years experience in enterprise systems.',
      img: 'https://i.pravatar.cc/300?img=11'
    },
    {
      name: 'Sarah Chen',
      role: 'Head of Engineering',
      desc: 'Full-stack expert specializing in high-load architecture.',
      img: 'https://i.pravatar.cc/300?img=32'
    },
    {
      name: 'Michael Ross',
      role: 'AI Solutions Architect',
      desc: 'PhD in Machine Learning, building future-ready AI bots.',
      img: 'https://i.pravatar.cc/300?img=12'
    },
    {
      name: 'Elena Velez',
      role: 'UX/UI Director',
      desc: 'Award-winning designer obsessed with human-centric interfaces.',
      img: 'https://i.pravatar.cc/300?img=44'
    },
  ];

  return (
    <section id="team" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-brand font-bold uppercase tracking-[0.2em] mb-4 block">Meet Our Minds</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900">The Experts Behind Redcat</h2>
          </div>
          <button className="px-8 py-3.5 bg-neutral-50 border border-black/5 rounded-xl font-bold flex items-center gap-2 hover:bg-neutral-100 transition-all text-neutral-800 font-bold uppercase tracking-widest text-[10px]">
            Join Our Team <ExternalLink className="w-5 h-5 opacity-50" />
          </button>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group"
            >
              <div className="relative mb-6 rounded-2xl overflow-hidden aspect-[4/5] bg-neutral-100 shadow-sm transition-shadow group-hover:shadow-xl">
                <img 
                  src={member.img} 
                  alt={member.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-neutral-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <div className="flex gap-4">
                    <Linkedin className="w-5 h-5 text-white/70 hover:text-white cursor-pointer" />
                    <Twitter className="w-5 h-5 text-white/70 hover:text-white cursor-pointer" />
                    <Github className="w-5 h-5 text-white/70 hover:text-white cursor-pointer" />
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-1 text-neutral-900">{member.name}</h3>
              <p className="text-brand text-xs font-bold mb-3 uppercase tracking-widest">{member.role}</p>
              <p className="text-neutral-500 text-sm leading-relaxed">{member.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const WhyChooseUs = () => {
  const points = [
    { icon: <MessageSquare />, title: '24/7 Support', desc: 'Always there when you need us.' },
    { icon: <Zap />, title: 'Fast Delivery', desc: 'Agile sprints for rapid releases.' },
    { icon: <ShieldCheck />, title: 'Secure Solutions', desc: 'Security is baked into every line.' },
    { icon: <Users />, title: 'Expert Team', desc: 'Senior engineers only, no interns.' },
    { icon: <Cpu />, title: 'Modern Tech', desc: 'Ahead of the curve, every time.' },
    { icon: <Star />, title: 'Client First', desc: 'Your vision, meticulously realized.' },
  ];

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-neutral-50 border border-black/5 p-12 lg:p-20 rounded-[60px] relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/5 rounded-full blur-[120px] -z-10" />
          
          <div className="text-center mb-16 px-6">
            <span className="text-brand font-bold uppercase tracking-[0.2em] mb-4 block">The Value Prop</span>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-neutral-900">Why Choose Redcat?</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {points.map((p, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ scale: 1.02 }}
                className="flex gap-6"
              >
                <div className="shrink-0 w-12 h-12 bg-white border border-black/5 shadow-sm rounded-2xl flex items-center justify-center text-brand">
                  {cloneElement(p.icon as ReactElement, { className: 'w-6 h-6' })}
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2 text-neutral-900">{p.title}</h4>
                  <p className="text-neutral-500 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "Why should I hire Redcat IT Solutions for my project?",
      a: "Redcat IT Solutions brings a decade of expertise, a senior-only engineering team, and a proven track record of delivering high-performance AI and web solutions. We prioritize transparency, security, and scalable architecture in every project we undertake."
    },
    {
      q: "What is the typical fee structure for hiring a professional software company?",
      a: "Costs vary based on project complexity, tech stack, and timeline. We offer competitive, value-based pricing models including fixed-price for defined scopes and time-and-materials for agile development. Contact us for a custom quote tailored to your budget."
    },
    {
      q: "What information is required to begin the development process?",
      a: "To start, we typically need a high-level project requirement document (PRD), your target audience profile, branding guidelines, and any existing technical constraints or integrations we should be aware of."
    },
    {
      q: "What is the typical timeline for an end-to-end software development project?",
      a: "Timeline depends on the scope. A minimum viable product (MVP) usually takes 8-12 weeks, while complex enterprise systems can take 6 months or more. We work in 2-week agile sprints to ensure constant delivery of value."
    },
    {
      q: "What are the core benefits of partnering with an IT agency versus a freelancer?",
      a: "Agencies like Redcat IT Solutions provide a full ecosystem—including project managers, UI/UX designers, and QA engineers—ensuring higher reliability, security compliance, and long-term maintenance support that freelancers often cannot guarantee."
    },
    {
      q: "What services does a comprehensive software agency like Redcat provide?",
      a: "We provide end-to-end digital transformation services including custom web and mobile development, AI & LLM integration, cloud infrastructure (DevOps), UI/UX design, and strategic technical consulting."
    }
  ];

  return (
    <section className="py-24 bg-neutral-50/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-brand font-bold uppercase tracking-[0.2em] mb-4 block">Information</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-neutral-950 font-display">Frequently <span className="text-brand">Asked Questions</span></h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 max-w-6xl mx-auto">
          {faqs.map((faq, idx) => (
            <div key={idx} className="mb-2">
              <button 
                onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between p-6 bg-brand text-white rounded-xl font-bold text-left transition-all hover:bg-red-700 shadow-md shadow-brand/10"
              >
                <span className="text-sm md:text-base leading-tight pr-4">{faq.q}</span>
                <div className={`shrink-0 w-6 h-6 flex items-center justify-center rounded-md border border-white/20 transition-transform duration-300 ${activeIndex === idx ? 'rotate-45' : ''}`}>
                  <span className="text-xl">+</span>
                </div>
              </button>
              <AnimatePresence>
                {activeIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 text-neutral-600 bg-white border-x border-b border-black/5 rounded-b-xl text-sm leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const center: [number, number] = [26.8467, 80.9462];

  return (
    <section id="contact" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 md:p-12 bg-neutral-50 rounded-[40px] border border-black/5 flex flex-col justify-center shadow-inner"
          >
            <span className="text-brand font-bold uppercase tracking-[0.3em] mb-4 block">Let's Connect</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-8 font-display">Ready to <span className="text-brand italic underline underline-offset-8 decoration-brand/20">start</span> your digital journey?</h2>
            
            <div className="space-y-8">
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-2xl bg-white border border-brand/10 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6 text-brand" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-1">Head Office</p>
                  <p className="text-neutral-900 font-bold leading-relaxed text-sm">
                    617 NEW -B Ujariyaon, Vijay Khand Gomti<br />
                    Nagar Lucknow, Uttar Pradesh 226010
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-2xl bg-white border border-brand/10 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6 text-brand" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-1">Call Us</p>
                  <p className="text-neutral-900 font-bold text-sm">Office: +91-9956973891</p>
                  <p className="text-neutral-900 font-bold text-sm">Sales: +91-7905939308</p>
                </div>
              </div>
              
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-2xl bg-white border border-brand/10 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6 text-brand" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-1">Email Us</p>
                  <p className="text-neutral-900 font-bold text-sm text-brand mb-1">support@redcat-it.com</p>
                  <p className="text-neutral-900 font-bold text-sm text-brand">contact@redcat-it.com</p>
                </div>
              </div>
            </div>
            
            <a 
              href="https://www.google.com/maps/dir/?api=1&destination=26.8467,80.9462"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-12 inline-flex items-center gap-3 brand-gradient px-8 py-4 rounded-2xl text-white font-black uppercase tracking-widest text-[10px] hover:shadow-xl hover:shadow-brand/20 transition-all w-fit"
            >
              Get Directions <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-[40px] overflow-hidden border border-black/5 shadow-2xl min-h-[500px] relative"
          >
            <div className="absolute inset-0 z-10 pointer-events-none border-[12px] border-neutral-50/50 rounded-[40px]"></div>
            
            <Map 
              height={500} 
              defaultCenter={center} 
              defaultZoom={15}
            >
              <Marker 
                width={50}
                anchor={center} 
                color="#e11d48"
              />
              <Overlay anchor={center} offset={[0, 0]}>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-neutral-100 px-6 py-5 rounded-[28px] flex flex-col items-center gap-1.5 min-w-[240px] relative -translate-x-1/2 -translate-y-[120%]"
                >
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand">Headquarters</p>
                  <p className="text-lg font-bold tracking-tight text-neutral-900">Redcat IT Solutions</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.3)]"></div>
                    <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Active Now</span>
                  </div>
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-r border-b border-neutral-100" />
                </motion.div>
              </Overlay>
            </Map>
            <div className="absolute top-6 right-6 z-20 flex flex-col gap-2">
              <div className="bg-white/90 backdrop-blur-md p-2 rounded-xl shadow-lg border border-black/5">
                <Target className="w-4 h-4 text-brand" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <ServicesSection />
      <Clients />
      <Team />
      <WhyChooseUs />
      <FAQ />
      <Contact />
    </>
  );
}
