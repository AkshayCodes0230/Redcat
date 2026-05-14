import React, { useState, useEffect, cloneElement, ReactElement } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { incrementVisitorCount, subscribeToVisitorCount } from './firebase';
import { 
  Code2, 
  Cpu, 
  Cloud, 
  Smartphone, 
  Palette, 
  MessageSquare, 
  ChevronRight, 
  Star, 
  Users, 
  CheckCircle2, 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Twitter, 
  Linkedin,
  Facebook,
  Menu,
  X,
  ExternalLink,
  Zap,
  ShieldCheck,
  MousePointer2,
  ChevronDown,
  Clock,
  ArrowRight,
  Target,
  Rocket,
  Instagram,
  MessageCircle,
  Send
} from 'lucide-react';
import { Map, Marker, Overlay } from 'pigeon-maps';

const API_KEY =
  process.env.GOOGLE_MAPS_PLATFORM_KEY ||
  (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
  (globalThis as any).GOOGLE_MAPS_PLATFORM_KEY ||
  '';
const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

// --- Constants ---

const SERVICES_DATA = [
  {
    id: 'software-dev',
    icon: <Code2 />,
    title: 'Software Development',
    desc: 'Bespoke software solutions engineered for complex business requirements, focusing on scalability and robust architecture.',
    details: [
      'Custom Enterprise Resource Planning (ERP)',
      'SaaS Platform Architecture & Development',
      'Legacy System Modernization & Refactoring',
      'Complex System Integration Services',
      'Database Design, Optimization & Migration',
      'Custom API Development & Management',
      'Microservices Architecture Design',
      'Desktop Application Development',
      'Real-time Data Processing Systems',
      'Blockchain & Smart Contract Integration'
    ]
  },
  {
    id: 'digital-marketing',
    icon: <Target />,
    title: 'Digital Marketing',
    desc: 'Data-driven marketing strategies to amplify your brand presence and drive high-quality lead generation across all digital channels.',
    details: [
      'Search Engine Marketing (SEM) Strategy',
      'Social Media Marketing (SMM) Campaigns',
      'High-Conversion Content Marketing',
      'PPC (Pay-Per-Click) Campaign Management',
      'Marketing Automation & CRM Integration',
      'Email Marketing & Lead Nurturing',
      'Influencer Marketing Coordination',
      'Comprehensive Digital Brand Audits',
      'Marketing Analytics & ROI Tracking',
      'Conversion Rate Optimization (CRO)'
    ]
  },
  {
    id: 'website-designing',
    icon: <Palette />,
    title: 'Website Designing',
    desc: 'Creative and intuitive web designs that capture your brand essence while providing world-class user experiences across all devices.',
    details: [
      'Comprehensive UI/UX Wireframing',
      'Responsive & Adaptive Web Design',
      'Full Visual Identity & Branding',
      'Interactive Prototyping (Figma/Adobe XD)',
      'Custom Graphic Asset & Icon Creation',
      'Motion Design & Micro-interactions',
      'Accessibility (WCAG) Focused Design',
      'Mobile-First Design Philosophy',
      'Design Systems & UI Pattern Libraries',
      'User Research & Usability Testing'
    ]
  },
  {
    id: 'web-dev',
    icon: <MousePointer2 />,
    title: 'Web Development',
    desc: 'Building modern, fast, and secure websites using the latest web technologies and industry-leading performance standards.',
    details: [
      'Modern Frontend (React, Vue, Next.js)',
      'Robust Backend Architecture (Node.js, Go)',
      'Progressive Web App (PWA) Development',
      'Core Web Vitals & Speed Optimization',
      'Security Hardening & SSL Integration',
      'Custom CMS Development & Integration',
      'Single Page Application (SPA) Experts',
      'Static Site Generation (SSG) for Speed',
      'Web-based Tool & Calculator Dev',
      'Third-party API & Webhook Integration'
    ]
  },
  {
    id: 'app-dev',
    icon: <Smartphone />,
    title: 'App Development',
    desc: 'Creating powerful mobile applications for both iOS and Android to connect with your customers in the most personal way possible.',
    details: [
      'Native iOS (Swift) Development',
      'Native Android (Kotlin) Development',
      'Cross-Platform (React Native/Flutter)',
      'Scalable Mobile Backend Infrastructure',
      'App Store Optimization (ASO) Strategy',
      'Mobile Payment Gateway Integration',
      'Biometric & Social Login Integration',
      'Real-time Messaging & Push Notifications',
      'Offline-First Data Storage Solutions',
      'Wearable & IoT Device Connectivity'
    ]
  },
  {
    id: 'ecommerce-dev',
    icon: <Smartphone />,
    title: 'E-Commerce Development',
    desc: 'End-to-end e-commerce solutions that convert visitors into loyal customers with seamless, secure, and fast shopping experiences.',
    details: [
      'Custom Shopping Cart Engineering',
      'Multi-currency Payment Integration',
      'Advanced Inventory Management Systems',
      'Multi-vendor Marketplace Platforms',
      'B2B & Wholesale E-commerce Portals',
      'Shopify, Magento & WooCommerce Setup',
      'Product Recommendation Engines',
      'Customer Loyalty & Reward Programs',
      'Abandoned Cart Recovery Systems',
      'Seamless Logistics & Shipping Sync'
    ]
  },
  {
    id: 'app-maintenance',
    icon: <ShieldCheck />,
    title: 'App Maintenance',
    desc: 'Ensuring your digital products stay up-to-date, secure, and performant long after the initial launch through professional support.',
    details: [
      'Critical Security Patching & Audits',
      'OS Version & Library Compatibility',
      'Continuous Bug Fixing & Stabilization',
      'Performance Monitoring & Tuning',
      'Feature Enhancements & Scaling',
      '24/7 Server & Uptime Monitoring',
      'Database Backup & Recovery Plans',
      'Content Updates & Media Management',
      'User Feedback Implementation',
      'Monthly Technical Health Reports'
    ]
  },
  {
    id: 'software-testing',
    icon: <CheckCircle2 />,
    title: 'Software Testing',
    desc: 'Rigorous Quality Assurance processes to ensure your software is bug-free, fast, and meets the highest industry standards.',
    details: [
      'Automated Regression Test Suites',
      'Detailed Manual Functional Testing',
      'Load, Stress & Scalability Testing',
      'Security Penetration & Vulnerability',
      'User Acceptance Testing (UAT) Flows',
      'Cross-Browser & Platform Testing',
      'API Performance & Schema Validation',
      'Usability & UX Compliance Testing',
      'Mobile Device Fragmentation Testing',
      'Continuous Integration Testing'
    ]
  },
  {
    id: 'web-app-dev',
    icon: <Code2 />,
    title: 'Web App Development',
    desc: 'Complex single-page applications and enterprise-grade web tools built for maximum performance, security, and scale.',
    details: [
      'Enterprise Single Page Apps (SPA)',
      'Real-time Collaboration & Dashboards',
      'Internal Business Productivity Tools',
      'Cloud-Native Cloud App Engineering',
      'API-First System Architecture',
      'Complex Data Visualization Systems',
      'Large Scale Content Management',
      'Customer Portals & Client Areas',
      'Complex Algorithmic Web Tools',
      'Multi-tenant Architecture Systems'
    ]
  },
  {
    id: 'web-hosting',
    icon: <Cloud />,
    title: 'Web Hosting',
    desc: 'High-availability, secure, and lightning-fast hosting solutions managed by our expert DevOps team on global cloud infrastructure.',
    details: [
      'Managed Cloud Hosting (AWS/GCP)',
      'SSL Certificate & DNS Management',
      'Automatic Hourly Cloud Backups',
      'Global Content Delivery Network (CDN)',
      'Auto-scaling Server Infrastructure',
      'Dedicated Server Resource Allocation',
      'E-mail Server Setup & Management',
      'Web Application Firewall (WAF)',
      'DDoS Protection & Mitigation',
      'Uptime Monitoring & Alerting'
    ]
  },
  {
    id: 'website-redesign',
    icon: <Zap />,
    title: 'Website Redesign',
    desc: 'Transforming your outdated website into a modern, high-converting digital storefront using the latest web technologies.',
    details: [
      'Legacy Codebase Modernization',
      'Modern UI/UX Visual Refresh',
      'Mobile-First & Fluid Adaptation',
      'SEO Value Preservation Migration',
      'Conversion Flow Optimization',
      'Speed & Performance Overhaul',
      'New Feature Layer Integration',
      'Accessibility Compliance Update',
      'Brand Evolution Implementation',
      'Framework Migration Services'
    ]
  },
  {
    id: 'mobile-app-dev',
    icon: <Smartphone />,
    title: 'Mobile App Development',
    desc: 'Advanced mobile experiences focusing on extreme user engagement and smooth native performance across all platforms.',
    details: [
      'Deep Performance Optimization',
      'Complex Push Notification Logic',
      'Custom In-App Analytics Setup',
      'Secure Multi-factor Auth Flows',
      'Robust Offline Data Synchronization',
      'Location-Based Services & Maps',
      'Social Platform Ecosystem Sync',
      'Camera & Media API Integration',
      'Custom App Animations & Transitions',
      'Deep Linking & Universal Links'
    ]
  },
  {
    id: 'iot-development',
    icon: <Cpu />,
    title: 'IOT Development',
    desc: 'Connecting physical devices and extracting business intelligence through cutting-edge Internet of Things engineering.',
    details: [
      'Smart Industrial Device Integration',
      'Real-time Sensor Data Monitoring',
      'IoT Edge Computing Logic',
      'Live Data Visualization Dashboards',
      'Secure Firmware Development',
      'MQTT & Low-latency Protocols',
      'Predictive Maintenance Algorithms',
      'Device Fleet Management Systems',
      'IoT Security & Data Encryption',
      'Voice Assistant (Alexa/Siri) Sync'
    ]
  },
  {
    id: 'seo',
    icon: <Target />,
    title: 'SEO Services',
    desc: 'Dominating search engine results to drive sustainable organic traffic and establish your authority in your specific niche.',
    details: [
      'Strategic Keyword Gap Analysis',
      'Full Technical SEO Infrastructure',
      'High-Authority Backlink Acquisition',
      'Local Business GMB Optimization',
      'Semantic Content Strategy Planning',
      'Rich Snippet & Schema Markup',
      'Video & Image Search SEO',
      'Detailed Monthly Traffic Reporting',
      'Competitor SEO Benchmarking',
      'Voice Search Optimization'
    ]
  },
  {
    id: 'smo',
    icon: <MessageSquare />,
    title: 'SMO Services',
    desc: 'Strategic social media optimization to build massive community engagement and iron-clad brand loyalty across all platforms.',
    details: [
      'Social Profile Identity Optimization',
      'Community Engagement Strategies',
      'Viral Content Calendar Creation',
      'Social Analytics & Trend Reporting',
      'Audience Persona Development',
      'Brand Storytelling & Narrative',
      'Facebook, Instagram & LinkedIn',
      'Real-time Social Listening',
      'Crisis Management Planning',
      'Platform-Specific Content Custom'
    ]
  }
];

const SERVICE_MAPPING: Record<string, string> = {
  'SOFTWARE DEVELOPMENT': 'software-dev',
  'DIGITAL MARKETING': 'digital-marketing',
  'WEBSITE DESIGNING': 'website-designing',
  'WEB DEVELOPMENT': 'web-dev',
  'APP DEVELOPMENT': 'app-dev',
  'E-COMMERCE DEVELOPMENT SERVICE': 'ecommerce-dev',
  'APP MAINTENANCE SERVICES': 'app-maintenance',
  'SOFTWARE TESTING': 'software-testing',
  'WEB APP DEVELOPMENT': 'web-app-dev',
  'WEB HOSTING': 'web-hosting',
  'WEBSITE REDESIGN': 'website-redesign',
  'MOBILE APP DEVELOPMENT': 'mobile-app-dev',
  'IOT DEVELOPMENT': 'iot-development',
  'SEO': 'seo',
  'SMO': 'smo'
};

// --- Components ---

interface NavbarProps {
  onSelectService: (service: any) => void;
}

const Navbar = ({ onSelectService }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const serviceItems = Object.keys(SERVICE_MAPPING);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Team', href: '#team' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleServiceClick = (item: string) => {
    const serviceId = SERVICE_MAPPING[item];
    const service = SERVICES_DATA.find(s => s.id === serviceId);
    if (service) {
      onSelectService(service);
      setIsServicesOpen(false);
      setIsMobileMenuOpen(false);
      
      // Scroll to services section
      const element = document.getElementById('services');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass-dark py-3 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2 group">
          <div className="w-10 h-10 brand-gradient rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-brand/20">
            <div className="w-5 h-5 bg-white rounded-sm rotate-45 animate-pulse shrink-0"></div>
          </div>
          <span className="text-xl font-display font-bold tracking-tighter text-neutral-900">
            REDCAT <span className="text-brand underline underline-offset-4 decoration-2">IT</span>
          </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#home" className="text-xs font-semibold text-neutral-500 hover:text-brand transition-colors uppercase tracking-[0.2em]">Home</a>
          
          {/* Services Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <button className="flex items-center gap-1 text-xs font-semibold text-neutral-500 hover:text-brand transition-colors uppercase tracking-[0.2em] cursor-pointer">
              Services <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <AnimatePresence>
              {isServicesOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full -left-4 w-64 pt-4"
                >
                  <div className="bg-white border border-black/5 shadow-2xl rounded-2xl overflow-hidden py-2 backdrop-blur-xl">
                    {serviceItems.map((item) => (
                      <button 
                        key={item} 
                        onClick={() => handleServiceClick(item)}
                        className="w-full text-left block px-6 py-2.5 text-[10px] font-bold text-neutral-500 hover:text-brand hover:bg-neutral-50 transition-all uppercase tracking-widest border-b border-black/[0.03] last:border-0 cursor-pointer"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {navLinks.filter(l => l.name !== 'Home').map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium text-neutral-500 hover:text-brand transition-colors uppercase tracking-widest"
              style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.2em' }}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact" 
            className="px-5 py-2 brand-gradient rounded-full text-xs font-bold text-white hover:shadow-lg hover:shadow-brand/40 transition-all border border-brand/10 uppercase tracking-widest"
          >
            Get Started
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-neutral-900" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full glass border-t border-black/5 p-6 md:hidden shadow-2xl max-h-[80vh] overflow-y-auto"
          >
            <div className="flex flex-col gap-4">
              <a 
                href="#home" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium text-neutral-600 hover:text-brand transition-colors"
              >
                Home
              </a>

              {/* Mobile Services Accordion */}
              <div className="space-y-2">
                <button 
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className="w-full flex items-center justify-between text-lg font-medium text-neutral-600 hover:text-brand transition-colors"
                >
                  Services <ChevronDown className={`w-5 h-5 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isServicesOpen && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden bg-neutral-50 rounded-xl"
                    >
                      <div className="py-2 flex flex-col">
                        {serviceItems.map((item) => (
                          <button 
                            key={item} 
                            onClick={() => handleServiceClick(item)}
                            className="w-full text-left px-6 py-3 text-[10px] font-bold text-neutral-500 hover:text-brand transition-colors uppercase tracking-widest border-b border-black/[0.03] last:border-0"
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {navLinks.filter(l => l.name !== 'Home').map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-neutral-600 hover:text-brand transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#contact" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-3 brand-gradient rounded-xl text-center font-bold text-white shadow-lg shadow-brand/20 mt-4 uppercase tracking-widest text-sm"
              >
                Get Started
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background elements */}
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
            <a href="#services" className="px-10 py-4 brand-gradient text-white rounded-xl font-bold hover:scale-105 transition-all flex items-center gap-2 group/btn shadow-xl shadow-brand/20">
              Our Portfolio <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
            </a>
            <a href="#contact" className="px-10 py-4 bg-transparent border border-neutral-200 text-neutral-900 rounded-xl font-bold hover:bg-neutral-50 transition-all text-center">
              View Services
            </a>
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
            {/* Overlay Grid */}
            <div className="absolute inset-0 bg-grid-white/[0.05] pointer-events-none" />
            
            {/* Floatings */}
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
          
          {/* Decorative Ring */}
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

const About = () => {
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -top-10 -left-10 w-40 h-40 brand-gradient rounded-full blur-[80px] opacity-20" />
            <span className="text-brand font-bold uppercase tracking-[0.2em] mb-4 block">About Our Company</span>
            <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-neutral-950">Engineering Digital Success with Passion & Innovation.</h2>
            <p className="text-neutral-500 mb-6 leading-relaxed text-lg">
              Redcat IT Solutions was born from a vision to bridge the gap between complex engineering and elegant business solutions. Today, we are a leading technology partner for global enterprises and ambitious startups alike.
            </p>
            <div className="space-y-4 mb-8">
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
                  <span className="font-medium text-neutral-700">{item}</span>
                </div>
              ))}
            </div>
            <button 
              onClick={() => setIsAboutModalOpen(true)}
              className="px-8 py-3.5 border border-neutral-200 text-neutral-900 rounded-xl font-bold hover:border-brand hover:text-brand transition-all cursor-pointer"
            >
              Learn More About Us
            </button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="space-y-4 mt-8">
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=400" alt="Team" className="rounded-2xl h-80 object-cover w-full shadow-lg" />
              <div className="bg-neutral-50 border border-black/5 p-6 rounded-2xl">
                <h4 className="text-2xl font-bold text-brand mb-1">98%</h4>
                <p className="text-sm text-neutral-500">Client retention rate across all sectors</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-neutral-50 border border-black/5 p-6 rounded-2xl">
                <Users className="w-8 h-8 text-brand mb-3" />
                <h4 className="text-lg font-bold text-neutral-900">Diverse Talent</h4>
                <p className="text-sm text-neutral-500">Experts from 12+ countries</p>
              </div>
              <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=400" alt="Meeting" className="rounded-2xl h-80 object-cover w-full shadow-lg" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* About Modal */}
      <AnimatePresence>
        {isAboutModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAboutModalOpen(false)}
              className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-[40px] shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => setIsAboutModalOpen(false)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 hover:bg-neutral-200 transition-colors z-10"
              >
                <X size={20} />
              </button>

              <div className="p-8 md:p-16">
                <div className="mb-12">
                  <span className="text-brand font-bold uppercase tracking-[0.2em] mb-4 block">Our Story</span>
                  <h3 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6 font-display">A Decade of Digital Evolution.</h3>
                  <p className="text-neutral-500 text-lg leading-relaxed max-w-2xl">
                    Founded in 2014, Redcat IT Solutions started with three engineers and a shared obsession for solving complex problems. Today, we're a global ecosystem of innovators, designers, and engineers.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 mb-16">
                  <div>
                    <h4 className="text-xl font-bold text-neutral-900 mb-4 flex items-center gap-2">
                       <Zap className="text-brand w-5 h-5" /> Our Mission
                    </h4>
                    <p className="text-neutral-600 leading-relaxed">
                      To empower organizations through high-performance technology that simplifies complexity and drives tangible business outcomes. We don't just build software; we build foundations for the future.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-neutral-900 mb-4 flex items-center gap-2">
                       <ShieldCheck className="text-brand w-5 h-5" /> Our Core Values
                    </h4>
                    <p className="text-neutral-600 leading-relaxed">
                      Transparency, technical rigor, and radical collaboration. We believe the best solutions come from diverse perspectives and a commitment to quality that goes beyond the codebase.
                    </p>
                  </div>
                </div>

                <div className="bg-neutral-50 rounded-3xl p-8 lg:p-12 border border-black/5">
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                      <div className="text-center">
                        <h5 className="text-3xl font-bold text-brand mb-1">200+</h5>
                        <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Projects Done</p>
                      </div>
                      <div className="text-center">
                        <h5 className="text-3xl font-bold text-brand mb-1">50+</h5>
                        <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Global Clients</p>
                      </div>
                      <div className="text-center">
                        <h5 className="text-3xl font-bold text-brand mb-1">12+</h5>
                        <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Countries</p>
                      </div>
                      <div className="text-center">
                        <h5 className="text-3xl font-bold text-brand mb-1">24/7</h5>
                        <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Support</p>
                      </div>
                   </div>
                </div>

                <div className="mt-12 flex justify-center">
                  <a 
                    href="#contact" 
                    onClick={() => setIsAboutModalOpen(false)}
                    className="px-10 py-4 brand-gradient text-white rounded-xl font-bold hover:scale-105 transition-all shadow-xl shadow-brand/20"
                  >
                    Start a Project with Us
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

interface ServicesProps {
  selectedService: any;
  setSelectedService: (service: any) => void;
}

const Services = ({ selectedService, setSelectedService }: ServicesProps) => {
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
          {SERVICES_DATA.map((service, idx) => (
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
              <p className="text-neutral-500 leading-relaxed transition-colors group-hover:text-neutral-700">
                {service.desc}
              </p>
              
              <button 
                onClick={() => setSelectedService(service)}
                className="mt-8 flex items-center gap-2 text-brand font-bold group/btn text-sm tracking-wider cursor-pointer"
              >
                LEARN MORE <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Service Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-2xl overflow-hidden"
            >
              <button 
                onClick={() => setSelectedService(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 hover:bg-neutral-200 transition-colors z-10"
              >
                <X size={20} />
              </button>

              <div className="p-8 md:p-12">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 brand-gradient rounded-2xl flex items-center justify-center text-white shrink-0">
                    {cloneElement(selectedService.icon as ReactElement, { className: "w-8 h-8" })}
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-neutral-900">{selectedService.title}</h3>
                    <p className="text-brand font-bold uppercase tracking-widest text-xs mt-1">Service Specialization</p>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <h4 className="text-lg font-bold text-neutral-900 mb-3">Overview</h4>
                    <p className="text-neutral-500 leading-relaxed">
                      {selectedService.desc} Our approach focuses on technical excellence, user-centric outcomes, and sustainable growth for your business.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-neutral-900 mb-4">Key Features</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      {selectedService.details.map((detail: string, i: number) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-brand/10 flex items-center justify-center shrink-0 mt-0.5">
                            <CheckCircle2 className="w-3 h-3 text-brand" />
                          </div>
                          <span className="text-sm font-medium text-neutral-600 leading-tight">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-neutral-100 flex flex-wrap gap-4 items-center justify-between">
                    <p className="text-neutral-400 text-xs font-bold uppercase tracking-widest italic">Ready to start? Let's talk.</p>
                    <a 
                      href="#contact" 
                      onClick={() => setSelectedService(null)}
                      className="px-8 py-3 brand-gradient text-white rounded-xl font-bold hover:scale-105 transition-all text-sm shadow-lg shadow-brand/20"
                    >
                      Consult Now
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
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
          <button className="px-8 py-3.5 bg-neutral-50 border border-black/5 rounded-xl font-bold flex items-center gap-2 hover:bg-neutral-100 transition-all text-neutral-800">
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

const Reviews = () => {
  const reviews = [
    {
      name: 'James Wilson',
      pos: 'CTO, TechNova',
      text: 'Their AI chatbot solution reduced our support tickets by 45%. The development was transparent and professional.',
      rating: 5,
      img: 'https://i.pravatar.cc/100?img=1'
    },
    {
      name: 'Lisa Anderson',
      pos: 'Product Manager, NexaSoft',
      text: 'Exceptional UX design. They truly understood our user persona and delivered a mobile app that doubled our daily engagement.',
      rating: 5,
      img: 'https://i.pravatar.cc/100?img=5'
    },
    {
      name: 'David Miller',
      pos: 'Founder, CloudSync',
      text: 'Efficient, scalable, and secure. Redcat is our go-to partner for all things Cloud and DevOps.',
      rating: 5,
      img: 'https://i.pravatar.cc/100?img=13'
    },
  ];

  return (
    <section id="reviews" className="py-24 bg-neutral-50/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-brand font-bold uppercase tracking-[0.2em] mb-4 block">Testimonials</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-neutral-950">What Our Clients Say</h2>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white border border-black/5 p-10 rounded-[40px] relative shadow-sm hover:shadow-xl transition-shadow"
            >
              <div className="flex text-amber-400 gap-1 mb-6">
                {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
              </div>
              <p className="text-lg italic text-neutral-700 mb-8 leading-relaxed">
                "{review.text}"
              </p>
              <div className="flex items-center gap-4">
                <img src={review.img} alt={review.name} className="w-12 h-12 rounded-full border-2 border-brand/10" />
                <div>
                  <h4 className="font-bold text-neutral-900">{review.name}</h4>
                  <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">{review.pos}</p>
                </div>
              </div>
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
            {/* Overlay Gradient to blend with UI */}
            <div className="absolute inset-0 z-10 pointer-events-none border-[12px] border-neutral-50/50 rounded-[40px]"></div>
            
            <Map 
              height={500} 
              defaultCenter={center} 
              defaultZoom={15}
              metaWheelZoom={true}
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
                  className="bg-neutral-900 shadow-2xl border border-white/10 px-5 py-4 rounded-[24px] flex flex-col items-center gap-1.5 min-w-[220px] relative -translate-x-1/2 -translate-y-[120%]"
                >
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand">Headquarters</p>
                  <p className="text-base font-bold tracking-tight text-white">Redcat IT Solutions</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                    <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Active Now</span>
                  </div>
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-neutral-900 rotate-45 border-r border-b border-white/10" />
                </motion.div>
              </Overlay>
            </Map>

            {/* Custom Control overlay */}
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

const Footer = ({ visitorCount }: { visitorCount: number | null }) => {
  const clients = ['TechNova', 'SKYEDGE', 'FinCore', 'CloudSync'];
  
  return (
    <footer className="bg-neutral-900 border-t border-black/10">
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20 text-white">
          <div className="col-span-full lg:col-span-1">
            <a href="#home" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 brand-gradient rounded flex items-center justify-center shadow-lg shadow-brand/20">
                <div className="w-4 h-4 bg-white rotate-45 rounded-sm"></div>
              </div>
              <span className="text-xl font-display font-bold tracking-tighter uppercase italic">REDCAT <span className="text-brand not-italic">IT</span></span>
            </a>
            <p className="text-white/50 mb-8 max-w-xs leading-relaxed text-sm font-medium">
              Redcat IT Solutions is at the forefront of digital innovation, helping businesses evolve through technology.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 bg-white/10 glass rounded flex items-center justify-center text-white/50 hover:text-[#1877F2] hover:bg-white transition-all ring-1 ring-white/10" title="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 glass rounded flex items-center justify-center text-white/50 hover:text-white hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] transition-all ring-1 ring-white/10" title="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 glass rounded flex items-center justify-center text-white/50 hover:text-white transition-all ring-1 ring-white/10" title="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 glass rounded flex items-center justify-center text-white/50 hover:text-[#0A66C2] hover:bg-white transition-all ring-1 ring-white/10" title="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-brand">Quick Links</h4>
            <ul className="space-y-4 text-sm font-bold">
              <li><a href="#home" className="text-white/40 hover:text-white transition-colors tracking-wide">HOME</a></li>
              <li><a href="#services" className="text-white/40 hover:text-white transition-colors tracking-wide">SERVICES</a></li>
              <li><a href="#about" className="text-white/40 hover:text-white transition-colors tracking-wide">ABOUT US</a></li>
              <li><a href="#team" className="text-white/40 hover:text-white transition-colors tracking-wide">OUR TEAM</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-brand">Services</h4>
            <ul className="space-y-4 text-sm font-bold">
              <li><a href="#" className="text-white/40 hover:text-white transition-colors tracking-wide uppercase">Web Development</a></li>
              <li><a href="#" className="text-white/40 hover:text-white transition-colors tracking-wide uppercase">AI & Automations</a></li>
              <li><a href="#" className="text-white/40 hover:text-white transition-colors tracking-wide uppercase">Cloud Solutions</a></li>
              <li><a href="#" className="text-white/40 hover:text-white transition-colors tracking-wide uppercase">UI/UX Design</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-brand">Newsletter</h4>
            <p className="text-white/40 text-xs mb-6 leading-relaxed font-bold uppercase tracking-tight">Stay updated with the latest in tech.</p>
            {visitorCount !== null && (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand/10 border border-brand/20 rounded-xl flex items-center justify-center">
                    <Users className="w-5 h-5 text-brand" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest leading-none mb-1">Total Visitors</p>
                    <p className="text-xl font-display font-bold text-white tracking-tighter">{visitorCount.toLocaleString()}</p>
                  </div>
                </div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
              </div>
            )}
            <div className="relative group mb-8">
              <input type="email" placeholder="Your email" className="w-full bg-white/5 border border-white/10 px-5 py-4 rounded-xl focus:outline-none focus:border-brand text-sm text-white placeholder:text-white/20" />
              <button className="absolute right-2 top-2 bottom-2 px-4 brand-gradient rounded-lg text-[10px] font-black uppercase tracking-tighter text-white">Join</button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Dock Area */}
      <div className="px-8 py-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 bg-[#0A0A0A]">
        <div className="flex flex-wrap gap-8 items-center justify-center">
          <div className="flex items-center gap-2 opacity-50">
            <span className="w-2 h-2 bg-brand rounded-full animate-ping"></span>
            <span className="text-[10px] font-mono tracking-tighter text-white">SYS_STATUS: ONLINE</span>
          </div>
          <div className="flex gap-6 grayscale opacity-40 text-white">
            {clients.map(c => <span key={c} className="text-[10px] font-black uppercase tracking-widest">{c}</span>)}
          </div>
        </div>
        <div className="flex gap-6 items-center text-white/30 font-medium tracking-tight">
          <span className="text-[10px]">© 2024 REDCAT IT SOLUTIONS</span>
          <div className="hidden md:flex gap-4">
            <a href="#" className="text-[10px] hover:text-white transition-colors">PRIVACY</a>
            <a href="#" className="text-[10px] hover:text-white transition-colors">TERMS</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

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

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [visitorCount, setVisitorCount] = useState<number | null>(null);

  useEffect(() => {
    let isSubscribed = true;
    
    const init = async () => {
      try {
        await incrementVisitorCount();
      } catch (err) {
        console.error("Increment failed", err);
      } finally {
        if (isSubscribed) setIsLoading(false);
      }
    };

    const unsubscribe = subscribeToVisitorCount((count) => {
      if (isSubscribed) setVisitorCount(count);
    });

    init();

    // Fallback timeout to ensure app always loads
    const timeout = setTimeout(() => {
      if (isSubscribed) setIsLoading(false);
    }, 3000);

    return () => {
      isSubscribed = false;
      unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="relative scroll-smooth">
      <AnimatePresence>
        {isLoading && <LoadingScreen key="loader" />}
      </AnimatePresence>
      
      {!isLoading && (
        <>
          <Navbar onSelectService={(s) => setSelectedService(s)} />
          <Hero />
          <StatsBar />
          <About />
          <Services selectedService={selectedService} setSelectedService={setSelectedService} />
          <Clients />
          <Team />
          <Reviews />
          <WhyChooseUs />
          <FAQ />
          <Contact />
          <Footer visitorCount={visitorCount} />
          <FloatingSocials />
          <VisitorBadge count={visitorCount} />
        </>
      )}
    </div>
  );
}

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

const FloatingSocials = () => {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[45] hidden lg:flex flex-col gap-4">
      <motion.a 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        href="#" 
        className="w-12 h-12 bg-white border border-black/5 shadow-lg rounded-2xl flex items-center justify-center text-neutral-600 hover:bg-brand hover:text-white hover:-translate-x-2 transition-all duration-300 group"
        title="Twitter"
      >
        <Twitter className="w-5 h-5" />
      </motion.a>
      <motion.a 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
        href="#" 
        className="w-12 h-12 bg-white border border-black/5 shadow-lg rounded-2xl flex items-center justify-center text-neutral-600 hover:bg-[#1877F2] hover:text-white hover:-translate-x-2 transition-all duration-300 group"
        title="Facebook"
      >
        <Facebook className="w-5 h-5" />
      </motion.a>
      <motion.a 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7 }}
        href="#" 
        className="w-12 h-12 bg-white border border-black/5 shadow-lg rounded-2xl flex items-center justify-center text-neutral-600 hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] hover:text-white hover:-translate-x-2 transition-all duration-300 group"
        title="Instagram"
      >
        <Instagram className="w-5 h-5" />
      </motion.a>
      <motion.a 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8 }}
        href="https://wa.me/919956973891" 
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 bg-white border border-black/5 shadow-lg rounded-2xl flex items-center justify-center text-neutral-600 hover:bg-[#25D366] hover:text-white hover:-translate-x-2 transition-all duration-300 group"
        title="WhatsApp"
      >
        <svg 
          viewBox="0 0 24 24" 
          className="w-5 h-5 fill-current"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </motion.a>
    </div>
  );
};

const CustomCursor = () => null;
