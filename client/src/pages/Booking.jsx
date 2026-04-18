import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function Booking() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Assuming backend booking logic goes here later
    // Redirect to success page for now
    navigate('/success');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Book Your Appointment</h1>
        <p className="text-gray-400 font-light max-w-xl mx-auto">Fill out the details below to reserve time with our expert stylists.</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass p-8 md:p-12 rounded-3xl"
      >
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Full Name</label>
              <input required type="text" name="name" value={formData.name} onChange={handleChange} className="glass-input w-full" placeholder="Jane Doe" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Email Address</label>
              <input required type="email" name="email" value={formData.email} onChange={handleChange} className="glass-input w-full" placeholder="jane@example.com" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Phone Number</label>
              <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="glass-input w-full" placeholder="+1 (555) 000-0000" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Select Service</label>
              <select required name="service" value={formData.service} onChange={handleChange} className="glass-input w-full [&>option]:bg-brand-charcoal [&>option]:text-white appearance-none">
                <option value="" disabled>Choose a service...</option>
                <option value="haircut">Signature Haircut</option>
                <option value="facial">Radiance Facial</option>
                <option value="makeup">Bridal & Event Makeup</option>
                <option value="spa">Relaxation Spa</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Preferred Date</label>
              <input required type="date" name="date" value={formData.date} onChange={handleChange} className="glass-input w-full [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Preferred Time</label>
              <input required type="time" name="time" value={formData.time} onChange={handleChange} className="glass-input w-full [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert" />
            </div>
          </div>

          <button type="submit" className="w-full bg-brand-pink text-brand-charcoal-dark font-medium text-lg py-4 rounded-xl tracking-wider hover:bg-brand-rose transition-colors mt-8">
            Confirm Booking
          </button>
        </form>
      </motion.div>
    </div>
  );
}
