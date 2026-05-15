import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Linkedin, Users } from 'lucide-react';

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className} 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const Footer = ({ visitorCount }: { visitorCount: number | null }) => {
  const clientsList = ['TechNova', 'SKYEDGE', 'FinCore', 'CloudSync'];
  
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20 text-neutral-900">
          <div className="col-span-full lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 brand-gradient rounded flex items-center justify-center shadow-lg shadow-brand/20">
                <div className="w-4 h-4 bg-white rotate-45 rounded-sm"></div>
              </div>
              <span className="text-xl font-display font-bold tracking-tighter uppercase italic">REDCAT <span className="text-brand not-italic">IT</span></span>
            </Link>
            <p className="text-neutral-500 mb-8 max-w-xs leading-relaxed text-sm font-medium">
              Redcat IT Solutions is at the forefront of digital innovation, helping businesses evolve through technology and creative engineering.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://wa.me/917651899736" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white border border-neutral-200 rounded flex items-center justify-center text-neutral-400 hover:text-white hover:bg-[#25D366] transition-all shadow-sm" title="WhatsApp">
                <WhatsAppIcon className="w-4 h-4" />
              </a>
              <a href="https://www.facebook.com/goredcat/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white border border-neutral-200 rounded flex items-center justify-center text-neutral-400 hover:text-[#1877F2] hover:bg-white transition-all shadow-sm" title="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://instagram.com/goredcat" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white border border-neutral-200 rounded flex items-center justify-center text-neutral-400 hover:text-white hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] transition-all shadow-sm" title="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 bg-white border border-neutral-200 rounded flex items-center justify-center text-neutral-400 hover:text-white hover:bg-[#1DA1F2] transition-all shadow-sm" title="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 bg-white border border-neutral-200 rounded flex items-center justify-center text-neutral-400 hover:text-[#0A66C2] hover:bg-white transition-all shadow-sm" title="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 uppercase tracking-[0.2em] text-[10px] text-brand">Quick Links</h4>
            <ul className="space-y-4 text-[10px] font-black">
              <li><Link to="/" className="text-neutral-400 hover:text-brand transition-colors tracking-[0.2em] uppercase">HOME</Link></li>
              <li><Link to="/about" className="text-neutral-400 hover:text-brand transition-colors tracking-[0.2em] uppercase">ABOUT US</Link></li>
              <li><Link to="/services" className="text-neutral-400 hover:text-brand transition-colors tracking-[0.2em] uppercase">SERVICES</Link></li>
              <li><Link to="/reviews" className="text-neutral-400 hover:text-brand transition-colors tracking-[0.2em] uppercase">REVIEWS</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 uppercase tracking-[0.2em] text-[10px] text-brand">Services</h4>
            <ul className="space-y-4 text-[10px] font-black">
              <li><Link to="/services/web-dev" className="text-neutral-400 hover:text-brand transition-colors tracking-[0.2em] uppercase">Web Development</Link></li>
              <li><Link to="/services/software-dev" className="text-neutral-400 hover:text-brand transition-colors tracking-[0.2em] uppercase">Software Dev</Link></li>
              <li><Link to="/services/iot-development" className="text-neutral-400 hover:text-brand transition-colors tracking-[0.2em] uppercase">IoT Solutions</Link></li>
              <li><Link to="/services/website-designing" className="text-neutral-400 hover:text-brand transition-colors tracking-[0.2em] uppercase">UI/UX Design</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 uppercase tracking-[0.2em] text-[10px] text-brand">Newsletter</h4>
            <p className="text-neutral-400 text-[10px] mb-6 leading-relaxed font-black uppercase tracking-tight">Stay updated with the latest in tech.</p>
            {visitorCount !== null && (
              <div className="bg-white border border-neutral-200 rounded-2xl p-4 flex items-center justify-between mb-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand/5 border border-brand/10 rounded-xl flex items-center justify-center">
                    <Users className="w-5 h-5 text-brand" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest leading-none mb-1">Total Visitors</p>
                    <p className="text-xl font-display font-bold text-neutral-900 tracking-tighter">{visitorCount.toLocaleString()}</p>
                  </div>
                </div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.3)]"></div>
              </div>
            )}
            <div className="relative group mb-8">
              <input type="email" placeholder="Your email" className="w-full bg-white border border-neutral-200 px-5 py-4 rounded-xl focus:outline-none focus:border-brand text-sm text-neutral-900 placeholder:text-neutral-300 shadow-sm transition-all" />
              <button className="absolute right-2 top-2 bottom-2 px-4 brand-gradient rounded-lg text-[10px] font-black uppercase tracking-tighter text-white hover:scale-105 transition-transform">Join</button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="px-8 py-6 border-t border-neutral-100 flex flex-col md:flex-row items-center justify-between gap-6 bg-white">
        <div className="flex flex-wrap gap-8 items-center justify-center">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-[9px] font-mono tracking-tighter text-neutral-400 uppercase">System Status: Online</span>
          </div>
          <div className="flex gap-6 grayscale opacity-30 text-neutral-900">
            {clientsList.map(c => <span key={c} className="text-[10px] font-black uppercase tracking-widest">{c}</span>)}
          </div>
        </div>
        <div className="flex gap-6 items-center text-neutral-400 font-medium tracking-tight">
          <span className="text-[9px] font-black uppercase tracking-widest leading-none">© 2024 REDCAT IT SOLUTIONS</span>
          <div className="hidden md:flex gap-4">
            <a href="#" className="text-[9px] hover:text-brand transition-colors uppercase tracking-widest font-black leading-none">PRIVACY</a>
            <a href="#" className="text-[9px] hover:text-brand transition-colors uppercase tracking-widest font-black leading-none">TERMS</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
