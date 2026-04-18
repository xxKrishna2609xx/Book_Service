import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard';
import { Scissors, Sparkles, Smile, Droplets } from 'lucide-react';

const services = [
  { id: 1, title: 'Signature Haircut', description: 'Precision cutting tailored to your face shape and lifestyle, including a luxurious wash and blowout.', price: 'from $85', icon: Scissors },
  { id: 2, title: 'Radiance Facial', description: 'Deep cleansing and rejuvenating facial treatment to restore your natural glow.', price: 'from $120', icon: Sparkles },
  { id: 3, title: 'Bridal & Event Makeup', description: 'Flawless, long-lasting makeup application for your most special occasions.', price: 'from $150', icon: Smile },
  { id: 4, title: 'Relaxation Spa', description: 'Full body massage and skin treatment to melt away stress and tension.', price: 'from $190', icon: Droplets },
];

export default function Home() {
  return (
    <div className="flex flex-col w-full h-full">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=2674&auto=format&fit=crop" alt="Salon ambient" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#121212]/50 via-[#121212]/80 to-[#0f0f0f]" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            Enhance Your Beauty, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-rose to-brand-pink">Book Your Glow.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light"
          >
            Experience the pinnacle of luxury hair and beauty treatments. Our expert stylists are dedicated to making you feel effortlessly beautiful.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link to="/booking" className="inline-block px-8 py-4 rounded-full bg-brand-pink text-brand-charcoal-dark font-medium text-lg tracking-wider hover:bg-brand-rose hover:scale-105 transition-all duration-300 shadow-[0_0_30px_-5px_rgba(229,152,155,0.4)] hover:shadow-[0_0_40px_0px_rgba(229,152,155,0.6)]">
              Book Appointment
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-8 max-w-7xl mx-auto w-full relative z-10 bg-[#0f0f0f]">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">Our Services</h2>
          <div className="w-24 h-1 bg-brand-pink/50 mx-auto rounded-full" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-full"
            >
              <ServiceCard {...service} />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
