import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export default function Success() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
        className="text-center max-w-lg mx-auto"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
          className="w-24 h-24 mx-auto rounded-full bg-brand-pink/20 border border-brand-pink/50 flex items-center justify-center mb-8 relative"
        >
          <CheckCircle2 className="w-12 h-12 text-brand-pink" />
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-4 flex items-center justify-center"
          >
            <Sparkles className="w-5 h-5 text-brand-rose absolute top-0 right-0" />
            <Sparkles className="w-4 h-4 text-brand-purple absolute bottom-0 left-0" />
          </motion.div>
        </motion.div>

        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Appointment Confirmed <span role="img" aria-label="sparkling heart">💖</span></h1>
        <p className="text-gray-400 font-light text-lg tracking-wide mb-10">
          A confirmation has been sent to your email. We look forward to treating you to a premium salon experience.
        </p>

        <Link to="/" className="inline-block px-8 py-3 rounded-full border border-brand-pink/50 text-brand-pink hover:bg-brand-pink hover:text-brand-charcoal-dark transition-all duration-300 tracking-wider font-medium">
          RETURN HOME
        </Link>
      </motion.div>
    </div>
  );
}
