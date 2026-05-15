import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { auth } from '../services/firebase';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyBookings = async () => {
      if (!auth.currentUser) return;
      
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:5001/beauty-sallon-901b3/us-central1/api";
        const email = encodeURIComponent(auth.currentUser.email);
        const res = await fetch(`${apiUrl}/bookings?email=${email}`);
        
        if (res.ok) {
          const data = await res.json();
          setBookings(data);
        } else {
          console.error("Failed to fetch bookings");
        }
      } catch (err) {
        console.error("Endpoint error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyBookings();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">My Bookings</h1>
        <p className="text-gray-400 font-light max-w-xl mx-auto">Track the status of your upcoming and past appointments.</p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="text-brand-pink tracking-widest animate-pulse">LOADING...</div>
        </div>
      ) : bookings.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-12 rounded-3xl text-center"
        >
          <p className="text-gray-300 text-lg">You have no upcoming bookings.</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking, idx) => (
            <motion.div 
              key={booking.id || idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass p-6 rounded-2xl relative overflow-hidden group hover:border-brand-pink/30 transition-colors"
            >
              {/* Decorative accent */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-pink to-brand-purple opacity-50" />
              
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-serif font-medium">{booking.service}</h3>
                <span className={`text-xs px-3 py-1 rounded-full font-medium tracking-wide
                  ${booking.status === 'Confirmed' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 
                    booking.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30' : 
                    'bg-gray-500/20 text-gray-300 border border-gray-500/30'}`}
                >
                  {booking.status}
                </span>
              </div>
              
              <div className="space-y-3 text-sm text-gray-400">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="font-light uppercase tracking-wider text-xs">Date</span>
                  <span className="text-white">{booking.date}</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="font-light uppercase tracking-wider text-xs">Time</span>
                  <span className="text-white">{booking.time}</span>
                </div>
                <div className="flex items-center justify-between pb-1">
                  <span className="font-light uppercase tracking-wider text-xs">For</span>
                  <span className="text-white">{booking.name}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
