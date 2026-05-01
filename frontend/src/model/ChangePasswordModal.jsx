import { useState, useEffect } from "react";
import { X, Lock, Loader2, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../services/api";
import { AUTH_URLS } from "../enum/apiUrl";
import { useToast } from "../context/ToastContext";
import { validatePassword } from "../utils/validation";

const ChangePasswordModal = ({ isOpen, onClose }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    if (!isOpen) {
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setShowOld(false);
      setShowNew(false);
      setShowConfirm(false);
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!oldPassword) {
      addToast("Current password is required", "error");
      return;
    }

    const passwordError = validatePassword(newPassword);
    if (passwordError) {
      addToast(passwordError, "error");
      return;
    }

    if (newPassword !== confirmPassword) {
      addToast("Passwords do not match", "error");
      return;
    }

    if (oldPassword === newPassword) {
      addToast("New password must be different from current password", "error");
      return;
    }

    setLoading(true);
    try {
      await api.post(AUTH_URLS.CHANGE_PASSWORD, { oldPassword, newPassword });
      addToast("Password changed successfully!");
      onClose();
    } catch (err) {
      addToast(
        err.response?.data?.message || "Failed to change password",
        "error",
      );
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
                <Lock size={24} />
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                Change Password
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Update your account security
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <label className="mb-1 block text-sm font-semibold text-slate-700">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showOld ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    className="w-full rounded-lg border border-slate-300 p-3 pr-10 text-slate-900 outline-none focus:border-indigo-600 transition-all"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowOld(!showOld)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showOld ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="relative">
                <label className="mb-1 block text-sm font-semibold text-slate-700">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNew ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    className="w-full rounded-lg border border-slate-300 p-3 pr-10 text-slate-900 outline-none focus:border-indigo-600 transition-all"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="relative">
                <label className="mb-1 block text-sm font-semibold text-slate-700">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    className="w-full rounded-lg border border-slate-300 p-3 pr-10 text-slate-900 outline-none focus:border-indigo-600 transition-all"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
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
                  {loading ? (
                    <Loader2 className="animate-spin mx-auto" size={20} />
                  ) : (
                    "Update Password"
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ChangePasswordModal;
