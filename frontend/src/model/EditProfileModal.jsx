import { useState, useEffect } from 'react';
import { X, User, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';

const EditProfileModal = ({ isOpen, onClose, initialName }) => {
  const [name, setName] = useState(initialName || '');
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();
  const { updateUser } = useAuth();

  useEffect(() => {
    if (isOpen) {
      setName(initialName);
    }
  }, [isOpen, initialName]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name.trim()) {
      addToast('Name is required', 'error');
      return;
    }

    if (name === initialName) {
      onClose();
      return;
    }

    setLoading(true);
    try {
      const response = await api.put('/auth/edit-user', { name });
      updateUser(response.data.data);
      addToast('Profile updated successfully!');
      onClose();
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to update profile', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white w-full max-w-md rounded-xl p-8 shadow-xl relative"
          >
            <button 
              onClick={onClose}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
            >
              <X size={20} />
            </button>

            <div className="mb-6 flex flex-col items-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                <User size={24} />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Update Profile</h2>
              <p className="text-sm text-slate-500 mt-1">Change your account name</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Full Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="Your Name"
                  className="w-full rounded-lg border border-slate-300 p-3 text-slate-900 outline-none focus:border-indigo-600 transition-all"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mt-8 flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 rounded-lg bg-slate-100 py-3 font-semibold text-slate-600 hover:bg-slate-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-[2] rounded-lg bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700 transition-all shadow-md disabled:opacity-50"
                >
                  {loading ? <Loader2 className="animate-spin mx-auto" size={20} /> : 'Save Changes'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default EditProfileModal;
