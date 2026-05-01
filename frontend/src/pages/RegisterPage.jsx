import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { UserPlus, Mail, Lock, User, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import {
  validateEmail,
  validatePassword,
  validateName,
} from "../utils/validation";
import { ROUTE_PATH } from "../enum/routePath";
import Input from "../components/Input";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (nameError || emailError || passwordError) {
      const firstError = nameError || emailError || passwordError;
      setError(firstError);
      addToast(firstError, "error");
      return;
    }

    setLoading(true);
    try {
      await register(name, email, password);
      addToast("Registration successful! Welcome to Note Flow.");
      navigate(ROUTE_PATH.DASHBOARD);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.errors?.[0]?.msg ||
          "Failed to register",
      );
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
            <UserPlus size={32} />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Create Account
          </h1>
          <p className="mt-2 text-slate-500 text-sm">
            Start organizing your notes today
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-600 border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Full Name"
            type="text"
            required
            placeholder="Enter your name"
            icon={User}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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
            placeholder="Create a password"
            icon={Lock}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center rounded-lg bg-indigo-600 py-3 font-semibold text-white transition-all hover:bg-indigo-700 active:scale-[0.99] disabled:opacity-50 shadow-sm"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              "Register"
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link
            to={ROUTE_PATH.LOGIN}
            className="font-semibold text-indigo-600 hover:underline"
          >
            Sign In
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
