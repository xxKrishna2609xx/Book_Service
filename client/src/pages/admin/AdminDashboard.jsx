import { useState, useEffect } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import { MoreHorizontal } from 'lucide-react';

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:5001/kaya-beauty-parlour/us-central1/api";
      const res = await fetch(`${apiUrl}/bookings`);
      if (res.ok) {
        const data = await res.json();
        setBookings(data);
      }
    } catch (error) {
      console.error("Failed to fetch bookings", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:5001/kaya-beauty-parlour/us-central1/api";
      const res = await fetch(`${apiUrl}/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        // Optimistic update
        setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
      }
    } catch (error) {
       alert("Failed to update status.");
    }
  };

  return (
    <div className="flex bg-[#0a0a0a] min-h-screen text-gray-100 font-sans z-[100] relative">
      <Sidebar />
      <div className="ml-64 flex-1 p-8">
        <header className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-semibold mb-1">Today's Dashboard</h1>
            <p className="text-sm text-gray-400">Overview of your salon appointments.</p>
          </div>
        </header>

        <div className="bg-[#121212] border border-[#1f1f1f] rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#1f1f1f] text-gray-400 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-medium">Client</th>
                <th className="px-6 py-4 font-medium">Service</th>
                <th className="px-6 py-4 font-medium">Date & Time</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1f1f1f]">
              {loading ? (
                <tr><td colSpan="5" className="px-6 py-8 text-center text-gray-500">Loading bookings...</td></tr>
              ) : bookings.length === 0 ? (
                <tr><td colSpan="5" className="px-6 py-8 text-center text-gray-500">No bookings found.</td></tr>
              ) : (
                bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-sm">{booking.name}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{booking.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-300">{booking.service}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">{booking.date}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{booking.time}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium cursor-pointer transition-colors
                        ${booking.status === 'Confirmed' ? 'bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20' : 
                          booking.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 hover:bg-yellow-500/20' : 
                          'bg-gray-500/10 text-gray-400 border border-gray-500/20 hover:bg-gray-500/20'}`}
                        // Simple toggle logic for demo: Pending -> Confirmed -> Completed
                        onClick={() => {
                          const next = booking.status === 'Pending' ? 'Confirmed' : booking.status === 'Confirmed' ? 'Completed' : 'Pending';
                          updateStatus(booking.id, next);
                        }}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-gray-400 hover:text-white transition-colors">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
