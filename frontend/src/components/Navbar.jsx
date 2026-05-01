import { useState, useRef, useEffect } from "react";
import { LogOut, ShieldCheck, ChevronDown, UserCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = ({ userName, onLogout, onChangePassword, onEditProfile }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="mx-auto mb-8 flex max-w-6xl items-center justify-between px-4 sm:px-0">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
          Note <span className="text-indigo-600">Flow</span>
        </h1>
        <p className="text-sm text-slate-500">Welcome, {userName}</p>
      </div>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 rounded-full bg-white border border-slate-200 p-1 pr-3 hover:bg-slate-50 transition-all shadow-sm active:scale-95"
        >
          <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
            {userName?.charAt(0).toUpperCase()}
          </div>
          <ChevronDown
            size={16}
            className={`text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 mt-2 w-56 rounded-xl bg-white border border-slate-200 shadow-xl z-[100] overflow-hidden"
            >
              <div className="p-2 border-b border-slate-100 bg-slate-50/50">
                <p className="text-xs font-semibold text-slate-400 px-3 py-1">
                  MY ACCOUNT
                </p>
              </div>

              <div className="p-1.5">
                <button
                  onClick={() => {
                    onEditProfile();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-lg transition-colors"
                >
                  <UserCircle size={18} />
                  <span>Update Profile</span>
                </button>

                <button
                  onClick={() => {
                    onChangePassword();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-lg transition-colors"
                >
                  <ShieldCheck size={18} />
                  <span>Change Password</span>
                </button>
              </div>

              <div className="border-t border-slate-100 p-1.5">
                <button
                  onClick={() => {
                    onLogout();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;
