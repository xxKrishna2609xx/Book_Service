import Sidebar from '../../components/admin/Sidebar';
import { MoreHorizontal } from 'lucide-react';

const bookings = [
  { id: '1', client: 'Sarah Connor', service: 'Signature Haircut', date: 'Oct 24, 2024', time: '10:00 AM', status: 'Confirmed' },
  { id: '2', client: 'Jane Doe', service: 'Radiance Facial', date: 'Oct 24, 2024', time: '11:30 AM', status: 'Pending' },
  { id: '3', client: 'Emma Stone', service: 'Relaxation Spa', date: 'Oct 25, 2024', time: '2:00 PM', status: 'Confirmed' },
  { id: '4', client: 'Lucy Liu', service: 'Bridal Makeup', date: 'Oct 26, 2024', time: '9:00 AM', status: 'Completed' },
];

export default function AdminDashboard() {
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
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-sm">{booking.client}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-300">{booking.service}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">{booking.date}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{booking.time}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                      ${booking.status === 'Confirmed' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 
                        booking.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' : 
                        'bg-gray-500/10 text-gray-400 border border-gray-500/20'}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-gray-400 hover:text-white transition-colors">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
