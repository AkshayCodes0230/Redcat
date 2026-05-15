import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { SERVICE_MAPPING } from '../constants/services';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
  }, [location]);

  const serviceItems = Object.keys(SERVICE_MAPPING);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Reviews', href: '/reviews' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-100 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-xl py-3 shadow-xl shadow-black/[0.03]' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 brand-gradient rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-brand/20">
            <div className="w-5 h-5 bg-white rounded-sm rotate-45 animate-pulse shrink-0"></div>
          </div>
          <span className="text-xl font-display font-bold tracking-tighter text-neutral-900 uppercase italic">
            REDCAT <span className="text-brand not-italic">IT</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          <Link to="/" className="text-[10px] font-black text-neutral-500 hover:text-brand transition-colors uppercase tracking-[0.3em]">Home</Link>
          <Link to="/about" className="text-[10px] font-black text-neutral-500 hover:text-brand transition-colors uppercase tracking-[0.3em]">About</Link>
          
          {/* Services Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <Link to="/services" className="flex items-center gap-1 text-[10px] font-black text-neutral-500 hover:text-brand transition-colors uppercase tracking-[0.3em] cursor-pointer">
              Services <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} />
            </Link>
            
            <AnimatePresence>
              {isServicesOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full -left-4 w-72 pt-4"
                >
                  <div className="bg-white border border-black/5 shadow-2xl rounded-3xl overflow-hidden py-3 backdrop-blur-3xl">
                    <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
                        {serviceItems.map((item) => (
                          <Link 
                            key={item} 
                            to={`/services/${SERVICE_MAPPING[item]}`}
                            className="w-full text-left block px-8 py-3.5 text-[10px] font-black text-neutral-400 hover:text-brand hover:bg-neutral-50 transition-all uppercase tracking-widest border-b border-black/[0.02] last:border-0"
                          >
                            {item}
                          </Link>
                        ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link to="/reviews" className="text-[10px] font-black text-neutral-500 hover:text-brand transition-colors uppercase tracking-[0.3em]">Reviews</Link>
          
        <Link 
  to="/#contact" 
  className="px-8 py-3 brand-gradient rounded-2xl text-[10px] font-black text-white hover:shadow-2xl hover:shadow-brand/40 transition-all border border-brand/10 uppercase tracking-widest"
>
  Work with us
</Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-neutral-900 w-12 h-12 flex items-center justify-center bg-neutral-50 rounded-2xl border border-black/5 shadow-sm" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-0 top-0 left-0 w-full bg-white z-[90] md:hidden pt-24 px-8 overflow-y-auto"
          >
            <div className="flex flex-col gap-6 py-8">
              <Link 
                to="/" 
                className="text-3xl font-bold text-neutral-900 border-b border-neutral-100 pb-4"
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="text-3xl font-bold text-neutral-900 border-b border-neutral-100 pb-4"
              >
                About
              </Link>

              <div className="space-y-4">
                <button 
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className="w-full flex items-center justify-between text-3xl font-bold text-neutral-900 border-b border-neutral-100 pb-4"
                >
                  Services <ChevronDown className={`w-8 h-8 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isServicesOpen && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden bg-neutral-50 rounded-[30px]"
                    >
                      <div className="py-4 flex flex-col">
                        <Link to="/services" className="px-8 py-4 text-xs font-black text-brand uppercase tracking-widest border-b border-black/[0.03]">View All Services</Link>
                        {serviceItems.map((item) => (
                          <Link 
                            key={item} 
                            to={`/services/${SERVICE_MAPPING[item]}`}
                            className="w-full text-left px-8 py-4 text-[10px] font-black text-neutral-400 hover:text-brand transition-colors uppercase tracking-widest border-b border-black/[0.03] last:border-0"
                          >
                            {item}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link 
                to="/reviews" 
                className="text-3xl font-bold text-neutral-900 border-b border-neutral-100 pb-4"
              >
                Reviews
              </Link>

            <Link 
  to="/#contact" 
  className="w-full py-6 brand-gradient rounded-3xl text-center font-black text-white shadow-2xl shadow-brand/20 mt-8 uppercase tracking-[0.2em] text-sm"
>
  Get Started
</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
