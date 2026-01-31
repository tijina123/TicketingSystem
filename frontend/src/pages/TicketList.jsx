import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

export default function TicketList() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("tickets/")
      .then((res) => setTickets(res.data))
      .finally(() => setLoading(false));
  }, []);


  const getStatusStyle = (status) => {
    const styles = {
      "Open": "bg-blue-100 text-blue-700 border-blue-200",
      "In Progress": "bg-amber-100 text-amber-700 border-amber-200",
      "Resolved": "bg-green-100 text-green-700 border-green-200",
      "Closed": "bg-slate-100 text-slate-700 border-slate-200",
    };
    return styles[status] || "bg-gray-100 text-gray-700";
  };


  const getPriorityStyle = (priority) => {
    const styles = {
      "High": "text-red-600 font-bold",
      "Medium": "text-orange-500 font-semibold",
      "Low": "text-emerald-600",
    };
    return styles[priority] || "text-gray-600";
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto">
      
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Support Tickets</h2>
            <p className="text-slate-500 mt-1">Manage and track your active support requests</p>
          </div>
          <Link
            to="/create"
            className="inline-flex items-center justify-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-sm transition-all active:scale-95"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Create New Ticket
          </Link>
        </div>

      
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-slate-400">Loading your tickets...</div>
          ) : tickets.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-slate-300 mb-4 flex justify-center">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <p className="text-slate-500 font-medium">No tickets found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-bottom border-slate-200">
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Title </th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Category </th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Priority </th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Status </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {tickets.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="px-6 py-4">
                        <Link to={`/tickets/${t.id}`} className="block">
                          <span className="text-slate-900 font-semibold group-hover:text-blue-600 transition-colors">
                            {t.title}
                          </span>
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-slate-600">{t.category}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-sm ${getPriorityStyle(t.priority)}`}>
                          {t.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyle(t.status)}`}>
                          {t.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}