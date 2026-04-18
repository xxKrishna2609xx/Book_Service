import { motion } from 'framer-motion';

export default function ServiceCard({ title, description, price, icon: Icon }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.3 }}
      className="glass p-8 rounded-2xl flex flex-col group relative overflow-hidden h-full"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-brand-pink/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="w-12 h-12 rounded-full bg-brand-charcoal-dark flex items-center justify-center mb-6 border border-white/5 group-hover:border-brand-pink/30 relative z-10 transition-colors">
        <Icon className="w-6 h-6 text-brand-rose" />
      </div>
      <h3 className="font-serif text-xl sm:text-2xl mb-3 relative z-10">{title}</h3>
      <p className="text-gray-400 font-light text-sm sm:text-base leading-relaxed mb-6 flex-grow relative z-10">{description}</p>
      <div className="mt-auto relative z-10 font-medium text-brand-pink tracking-wider">
        {price}
      </div>
    </motion.div>
  );
}
