import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function CreateTicket() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "", // Changed to empty to force selection
    category: "", // Changed to empty to force selection
  });
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation to ensure "Select" wasn't left as the value
    if (!form.category || !form.priority) {
      alert("Please select a Category and Priority Level.");
      return;
    }

    setLoading(true);
    const data = new FormData();
    Object.keys(form).forEach((key) => data.append(key, form[key]));
    for (let file of files) data.append("attachments", file);

    try {
      await api.post("tickets/", data);
      navigate("/tickets");
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        
        <div className="bg-slate-900 p-6">
          <h2 className="text-xl font-bold text-white">Submit New Support Ticket</h2>
          <p className="text-slate-400 text-sm mt-1">Provide details about your issue and attach relevant files.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Subject */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Subject</label>
            <input
              required
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
              placeholder="Briefly describe the issue"
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Category Dropdown */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
              <select
                required
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                <option value="" disabled>Select Category</option>
                <option value="Bug">Bug</option>
                <option value="Request">Request</option>
                <option value="Billing">Billing</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Priority Dropdown */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Priority Level</label>
              <select
                required
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value })}
              >
                <option value="" disabled>Select Priority</option>
                <option value="Low">Low Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="High">High Priority</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Detailed Description</label>
            <textarea
              required
              rows="4"
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
              placeholder="Tell us more about the problem..."
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>

          {/* File Upload Area */}
          <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 bg-slate-50 hover:bg-slate-100 transition-colors">
            <div className="flex flex-col items-center">
              <svg className="w-10 h-10 text-slate-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="text-sm text-slate-600 mb-2 font-medium">Attach files (PDF, JPG, PNG, DOCX)</p>
              <input
                type="file"
                multiple
                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                onChange={(e) => setFiles(e.target.files)}
              />
              <p className="text-[10px] text-slate-400 mt-2 uppercase tracking-wider">Max 5MB per file</p>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center items-center py-4 rounded-xl text-white font-bold text-lg transition-all shadow-lg ${
                loading ? "bg-slate-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 active:scale-[0.99]"
              }`}
            >
              {loading ? "Processing..." : "Submit Ticket"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}