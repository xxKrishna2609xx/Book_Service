import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Booking from './pages/Booking';
import Success from './pages/Success';
import AdminDashboard from './pages/admin/AdminDashboard';
import { useState, useEffect } from 'react';
import { auth } from './services/firebase';

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center font-serif text-brand-pink">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  
  return children;
};

// Component to handle layout switching without causing routing issues.
function AppLayout() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) {
      return (
          <Routes>
              <Route path="/admin/*" element={<AdminDashboard />} />
          </Routes>
      );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans relative overflow-hidden bg-brand-charcoal">
      {/* Subtle ambient light from behind the app */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1]">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-brand-purple/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-pink/10 rounded-full blur-[100px]" />
      </div>
      <Navbar />
      <main className="flex-grow z-10 w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/booking" element={
            <ProtectedRoute>
              <Booking />
            </ProtectedRoute>
          } />
          <Route path="/success" element={<Success />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}
