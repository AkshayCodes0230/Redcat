import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { incrementVisitorCount, subscribeToVisitorCount } from './firebase';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import VisitorBadge from './components/VisitorBadge';
import FloatingSocials from './components/FloatingSocials';
import ScrollToTop from './components/ScrollToTop';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import ReviewsPage from './pages/ReviewsPage';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
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

    // Fallback timeout
    const timeout = setTimeout(() => {
      if (isSubscribed) setIsLoading(false);
    }, 2000);

    return () => {
      isSubscribed = false;
      unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="relative overflow-x-hidden selection:bg-brand/10 selection:text-brand">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <LoadingScreen key="loader" />
          ) : (
            <div key="content" className="flex flex-col min-h-screen">
              <Navbar />
              <div className="flex-grow">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/services/:serviceId" element={<ServiceDetailPage />} />
                  <Route path="/reviews" element={<ReviewsPage />} />
                </Routes>
              </div>
              <Footer visitorCount={visitorCount} />
              <FloatingSocials />
              <VisitorBadge count={visitorCount} />
            </div>
          )}
        </AnimatePresence>
      </div>
    </Router>
  );
}
