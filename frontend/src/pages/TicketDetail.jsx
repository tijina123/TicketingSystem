import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";

export default function TicketDetail() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    api.get(`tickets/${id}/`).then((res) => setTicket(res.data));
  }, [id]);

  if (!ticket) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-slate-500 font-medium">Loading ticket details...</div>
      </div>
    );
  }

  const statusColors = {
    Open: "bg-emerald-100 text-emerald-700 border-emerald-200",
    "In Progress": "bg-amber-100 text-amber-700 border-amber-200",
    Resolved: "bg-blue-100 text-blue-700 border-blue-200",
    Closed: "bg-slate-200 text-slate-700 border-slate-300",
  };

  const priorityColors = {
    High: "text-red-600",
    Medium: "text-orange-500",
    Low: "text-emerald-600",
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
       
        <Link to="/tickets" className="inline-flex items-center text-sm text-slate-500 hover:text-blue-600 mb-6 transition-colors">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Ticket List
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
       
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-extrabold text-slate-900 leading-tight">{ticket.title}</h2>
                <span className={`px-4 py-1.5 text-xs font-bold rounded-full border shadow-sm ${statusColors[ticket.status]}`}>
                  {ticket.status}
                </span>
              </div>

              <div className="prose prose-slate max-w-none mb-8">
                <h3 className="text-sm uppercase tracking-wider text-slate-400 font-bold mb-3">Description</h3>
                <p className="text-slate-700 text-lg whitespace-pre-wrap leading-relaxed">
                  {ticket.description}
                </p>
              </div>

            
              <div className="pt-8 border-t border-slate-100">
                <h3 className="text-sm uppercase tracking-wider text-slate-400 font-bold mb-4">Attachments [cite: 37]</h3>
                {ticket.attachments.length === 0 ? (
                  <div className="bg-slate-50 border border-dashed border-slate-200 rounded-xl p-6 text-center text-slate-400 text-sm">
                    No files attached to this ticket.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {ticket.attachments.map((a) => (
                      <a
                        key={a.id}
                        href={a.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all group"
                      >
                        <div className="bg-blue-50 p-2 rounded-lg mr-4 group-hover:bg-blue-100 transition-colors">
                          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                          </svg>
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-sm font-semibold text-slate-900 truncate">{a.file.split("/").pop()}</p>
                          <p className="text-[10px] text-slate-400 uppercase font-medium mt-0.5">
                            {new Date(a.uploaded_at).toLocaleDateString()}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

        
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-slate-900 font-bold mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Ticket Info
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between text-sm py-2 border-b border-slate-50">
                  <span className="text-slate-500">Priority</span>
                  <span className={`font-bold ${priorityColors[ticket.priority]}`}>{ticket.priority}</span>
                </div>
                <div className="flex justify-between text-sm py-2 border-b border-slate-50">
                  <span className="text-slate-500">Category</span>
                  <span className="text-slate-900 font-semibold">{ticket.category}</span>
                </div>
                <div className="flex justify-between text-sm py-2 border-b border-slate-50">
                  <span className="text-slate-500">Created</span>
                  <span className="text-slate-900">{new Date(ticket.created_at).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between text-sm py-2">
                  <span className="text-slate-500">Last Update</span>
                  <span className="text-slate-900">{new Date(ticket.updated_at).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100">
                <p className="text-[11px] text-slate-400 uppercase tracking-widest text-center font-bold">
                  Ref ID: #{id}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}