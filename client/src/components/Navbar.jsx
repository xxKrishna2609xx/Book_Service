import { Link, useLocation } from 'react-router-dom';
import { Sparkles, User, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { auth, logout } from '../services/firebase';

export default function Navbar() {
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  return (
    <nav className="flex items-center justify-between px-8 py-6 sticky top-0 bg-[#0f0f0f]/80 backdrop-blur-md z-50 border-b border-white/5">
      <Link to="/" className="flex items-center gap-2 group">
        <Sparkles className="w-6 h-6 text-brand-pink group-hover:text-brand-rose transition-colors" />
        <span className="font-serif text-2xl font-bold tracking-wide">KAYA<span className="text-brand-pink text-3xl leading-none">.</span></span>
      </Link>
      
      <div className="flex items-center gap-8">
        <Link to="/" className={`text-sm tracking-widest hover:text-brand-rose transition-colors ${location.pathname === '/' ? 'text-brand-pink' : 'text-gray-400'}`}>HOME</Link>
        <Link to="/booking" className={`text-sm tracking-widest hover:text-brand-rose transition-colors ${location.pathname === '/booking' ? 'text-brand-pink' : 'text-gray-400'}`}>BOOKING</Link>
        {user ? (
          <>
            <Link to="/my-bookings" className={`text-sm tracking-widest hover:text-brand-rose transition-colors ${location.pathname === '/my-bookings' ? 'text-brand-pink' : 'text-gray-400'}`}>MY BOOKINGS</Link>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-brand-pink/20 border border-brand-pink flex items-center justify-center overflow-hidden">
                {user.photoURL ? <img src={user.photoURL} alt="User" /> : <User className="w-4 h-4 text-brand-pink" />}
              </div>
              <button onClick={logout} className="text-gray-400 hover:text-white transition-colors" title="Logout">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </>
        ) : (
          <Link to="/login" className="px-6 py-2 rounded-full border border-brand-pink/50 text-brand-pink hover:bg-brand-pink hover:text-brand-charcoal-dark transition-all duration-300 tracking-wider text-sm">
            SIGN IN
          </Link>
        )}
      </div>
    </nav>
  );
}
