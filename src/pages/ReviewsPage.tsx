import React from 'react';
import { motion } from 'motion/react';
import { Star, MessageSquare, CheckCircle2 } from 'lucide-react';

const ReviewsPage = () => {
  const reviews = [
    {
      name: 'James Wilson',
      pos: 'CTO, TechNova',
      text: 'Their AI chatbot solution reduced our support tickets by 45%. The development was transparent and professional.',
      rating: 5,
      img: 'https://i.pravatar.cc/100?img=1',
      date: 'March 2024'
    },
    {
      name: 'Lisa Anderson',
      pos: 'Product Manager, NexaSoft',
      text: 'Exceptional UX design. They truly understood our user persona and delivered a mobile app that doubled our daily engagement.',
      rating: 5,
      img: 'https://i.pravatar.cc/100?img=5',
      date: 'January 2024'
    },
    {
      name: 'David Miller',
      pos: 'Founder, CloudSync',
      text: 'Efficient, scalable, and secure. Redcat is our go-to partner for all things Cloud and DevOps.',
      rating: 5,
      img: 'https://i.pravatar.cc/100?img=13',
      date: 'December 2023'
    },
    {
      name: 'Sarah Thompson',
      pos: 'CEO, BrightPath',
      text: 'Working with Redcat has been a game-changer for our startup. They delivered our MVP ahead of schedule with top-notch quality.',
      rating: 5,
      img: 'https://i.pravatar.cc/100?img=10',
      date: 'February 2024'
    },
    {
      name: 'Robert Chen',
      pos: 'Operations Director, Alpha Systems',
      text: 'Their web development team is highly skilled. They rebuilt our internal portal, making it significantly faster and easier to use.',
      rating: 5,
      img: 'https://i.pravatar.cc/100?img=15',
      date: 'November 2023'
    }
  ];

  return (
    <div className="pt-32 pb-24 min-h-screen bg-neutral-50/30">
      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-brand font-bold uppercase tracking-[0.2em] mb-4 block">Our Reputation</span>
          <h1 className="text-5xl lg:text-7xl font-extrabold mb-8 text-neutral-950">Client Success Stories</h1>
          <p className="text-neutral-500 max-w-2xl mx-auto text-lg font-medium">
            We measure our success by the growth and achievements of our partners. Here's what they have to say about working with us.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {reviews.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white border border-black/5 p-10 rounded-[40px] shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="flex text-amber-400 gap-1">
                  {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{review.date}</span>
              </div>
              
              <p className="text-xl italic text-neutral-700 mb-10 leading-relaxed font-serif">
                "{review.text}"
              </p>
              
              <div className="flex items-center gap-5">
                <div className="relative">
                    <img src={review.img} alt={review.name} className="w-16 h-16 rounded-full border-2 border-brand/10 grayscale group-hover:grayscale-0 transition-all duration-500" />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-brand rounded-full flex items-center justify-center border-2 border-white">
                        <CheckCircle2 className="w-3 h-3 text-white" />
                    </div>
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 text-lg">{review.name}</h4>
                  <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-black">{review.pos}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 p-12 bg-white border border-neutral-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] rounded-[50px] text-neutral-900 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand/5 rounded-full blur-[100px] -z-0" />
            <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-brand/10 border border-brand/10 flex items-center justify-center mb-8">
                    <MessageSquare className="w-8 h-8 text-brand" />
                </div>
                <h2 className="text-4xl font-bold mb-6 font-display">Want to be our next <span className="text-brand">success story?</span></h2>
                <p className="text-neutral-500 mb-10 max-w-lg font-medium leading-relaxed text-lg">Let's build something extraordinary together. Our team is ready to transform your vision into reality.</p>
                <button className="px-12 py-5 brand-gradient text-white rounded-2xl font-bold hover:scale-105 transition-all shadow-xl shadow-brand/40 uppercase tracking-[0.2em] text-[10px]">
                    Contact Us Today
                </button>
            </div>
        </div>
      </section>
    </div>
  );
};

export default ReviewsPage;
