import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

 const   handleLogout = () => {
  localStorage.clear();
  window.location.replace("/");
};





  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
    
        <div className="flex items-center space-x-2">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Support<span className="text-blue-600">Desk</span>
          </h1>
        </div>

       
        <div className="hidden md:flex items-center space-x-8">
          <Link
            to="/tickets"
            className={`text-sm font-semibold transition-colors ${
              isActive("/tickets") ? "text-blue-600" : "text-slate-600 hover:text-blue-600"
            }`}
          >
            My Tickets
          </Link>
          <Link
            to="/create"
            className={`text-sm font-semibold transition-colors ${
              isActive("/create") ? "text-blue-600" : "text-slate-600 hover:text-blue-600"
            }`}
          >
            Create Ticket
          </Link>
        </div>

     
        <div className="flex items-center space-x-6">
        
          <div className="hidden sm:flex items-center space-x-3 pr-6 border-r border-slate-200">
            <div className="text-right">
              <p className="text-xs font-bold text-slate-900 uppercase tracking-widest">Customer</p>
              <p className="text-[10px] text-slate-400">Secure PIN Session</p>
            </div>
            <div className="h-8 w-8 bg-slate-100 rounded-full border border-slate-200 flex items-center justify-center">
              <svg className="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center text-sm font-bold text-slate-500 hover:text-red-600 transition-colors group"
          >
            <span>Logout</span>
            <svg 
              className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}