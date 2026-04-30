import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { LogIn, Mail, Lock, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Input from '../components/Input';
import { validateEmail } from '../utils/validation';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const emailError = validateEmail(email);
    if (emailError) {
      setError(emailError);
      addToast(emailError, 'error');
      return;
    }

    if (!password) {
      setError('Password is required');
      addToast('Password is required', 'error');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      addToast('Welcome back! Login successful.');
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-xl bg-white p-8 shadow-md border border-slate-200"
      >
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
            <LogIn size={32} />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Sign In</h1>
          <p className="mt-2 text-slate-500 text-sm">Access your notes anywhere, anytime</p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-600 border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Email"
            type="email"
            required
            placeholder="example@mail.com"
            icon={Mail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            label="Password"
            type="password"
            required
            placeholder="Enter password"
            icon={Lock}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center rounded-lg bg-indigo-600 py-3 font-semibold text-white transition-all hover:bg-indigo-700 active:scale-[0.99] disabled:opacity-50 shadow-sm"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Login'}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-500">
          New here?{' '}
          <Link to="/register" className="font-semibold text-indigo-600 hover:underline">
            Create an account
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
