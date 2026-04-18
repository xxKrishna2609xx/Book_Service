import { CalendarDays, Settings, Users, Scissors } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="w-64 bg-[#121212] border-r border-[#1f1f1f] h-screen fixed top-0 left-0 flex flex-col items-center py-8">
      <div className="text-xl font-serif text-white font-bold mb-12 tracking-wide text-center">
        KAYA ADMIN<span className="text-brand-pink">.</span>
      </div>

      <div className="flex flex-col w-full gap-2 px-4">
        <Link to="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-brand-pink/10 text-brand-pink hover:bg-brand-pink/20 transition-colors">
          <CalendarDays className="w-5 h-5" />
          <span className="font-medium text-sm">Bookings</span>
        </Link>
        <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-[#1f1f1f] hover:text-white transition-colors text-left">
          <Scissors className="w-5 h-5" />
          <span className="font-medium text-sm">Services</span>
        </button>
        <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-[#1f1f1f] hover:text-white transition-colors text-left">
          <Users className="w-5 h-5" />
          <span className="font-medium text-sm">Clients</span>
        </button>
        <div className="mt-auto w-full px-4 text-center">
             <Link to="/" className="text-xs text-brand-pink hover:underline">Back to Client Site</Link>
        </div>
      </div>
    </div>
  );
}
