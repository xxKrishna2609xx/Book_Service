import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { loginWithGoogle, auth } from '../services/firebase';
import { useState, useEffect } from 'react';

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  
  useEffect(() => {
    // If user is already logged in, redirect them
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if(user) navigate('/booking');
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate('/booking');
    } catch (err) {
      setError('Failed to login. Please try again.');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Dynamic blurred gradient background exclusively for Login */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-pink/30 rounded-full mix-blend-screen filter blur-[100px] opacity-50 animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-brand-purple/30 rounded-full mix-blend-screen filter blur-[100px] opacity-50 animate-blob" style={{animationDelay: '2s'}} />
        <div className="absolute bottom-1/4 left-1/2 w-[600px] h-[600px] bg-white/5 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-blob" style={{animationDelay: '4s'}} />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass w-full max-w-md p-10 rounded-3xl relative z-10 flex flex-col items-center"
      >
        <div className="w-16 h-16 rounded-full bg-brand-pink/20 flex items-center justify-center mb-6 border border-brand-pink/30 shadow-[0_0_20px_rgba(229,152,155,0.3)]">
          <span className="font-serif text-3xl text-brand-pink font-bold">K</span>
        </div>
        
        <h2 className="font-serif text-3xl font-bold mb-2 text-center text-white">Welcome Back</h2>
        <p className="text-gray-400 font-light text-center mb-10 text-sm">Sign in to continue booking your premium salon experience.</p>
        
        {error && <div className="mb-4 text-red-400 text-sm text-center">{error}</div>}
        
        <button 
          onClick={handleGoogleLogin}
          className="w-full relative group overflow-hidden rounded-full p-[1px] mb-6 block"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-brand-pink via-brand-purple to-brand-rose opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative bg-[#121212] px-8 py-4 rounded-full flex items-center justify-center gap-3 transition-colors group-hover:bg-transparent">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
            </svg>
            <span className="font-medium tracking-wide text-white">Continue with Google</span>
          </div>
        </button>

        <p className="text-xs text-gray-500 font-light text-center mt-4">
          By signing in, you agree to Kaya Beauty Parlour's<br/>Terms of Service and Privacy Policy.
        </p>
      </motion.div>
    </div>
  );
}
