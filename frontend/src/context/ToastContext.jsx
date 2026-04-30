import { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div 
        style={{ zIndex: 99999 }}
        className="fixed top-5 right-5 flex flex-col gap-3 pointer-events-none"
      >
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`flex items-center gap-3 min-w-[320px] rounded-xl border p-4 shadow-2xl pointer-events-auto ${
                toast.type === 'success' 
                  ? 'bg-white border-green-200 text-green-900' 
                  : toast.type === 'error'
                  ? 'bg-white border-red-200 text-red-900'
                  : 'bg-white border-blue-200 text-blue-900'
              }`}
            >
              <div className="flex-shrink-0">
                {toast.type === 'success' && <CheckCircle className="text-green-500" size={24} />}
                {toast.type === 'error' && <XCircle className="text-red-500" size={24} />}
                {toast.type === 'info' && <Info className="text-blue-500" size={24} />}
              </div>
              
              <div className="flex-1 text-sm font-semibold">
                {toast.message}
              </div>
              
              <button 
                onClick={() => removeToast(toast.id)}
                className="ml-2 p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
              >
                <X size={16} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a ToastProvider');
  return context;
};
