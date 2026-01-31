import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); 
    setLoading(true);
    setError("");

    try {
      const res = await api.post("users/login/", { pin });
     
      localStorage.setItem("access", res.data.access);
      if (res.data.refresh) localStorage.setItem("refresh", res.data.refresh);
      
      navigate("/tickets");
    } catch (err) {
      
      setError(err.response?.data?.detail || "Invalid or already used PIN.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md border border-slate-100">
        {/* Branding/Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-blue-100 p-4 rounded-full">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        </div>

        <h2 className="text-3xl font-extrabold text-slate-800 text-center mb-2">Support Access</h2>
        <p className="text-slate-500 text-center mb-8 text-sm">
          Enter your unique Support PIN to access your tickets. <br/>
          <span className="font-semibold text-orange-600 italic text-xs">Note: This PIN will expire after login.</span>
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Support PIN</label>
            <input
              type="text"
              className={`w-full p-4 border rounded-xl text-lg tracking-widest text-center font-mono focus:outline-none focus:ring-2 transition-all ${
                error ? 'border-red-500 ring-red-100' : 'border-slate-200 focus:ring-blue-500 ring-blue-100'
              }`}
              placeholder="SUP-XXXX-XXXX"
              value={pin}
              autoFocus
              onChange={(e) => setPin(e.target.value.toUpperCase())}
            />
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm text-center font-medium">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !pin}
            className={`w-full py-4 rounded-xl text-white font-bold text-lg transition-all shadow-lg ${
              loading || !pin ? 'bg-slate-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 active:scale-[0.98]'
            }`}
          >
            {loading ? "Authenticating..." : "Access Dashboard"}
          </button>
        </form>
        
       
      </div>
    </div>
  );
}