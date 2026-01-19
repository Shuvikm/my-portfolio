import { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, LogIn, UserPlus, Loader2, CheckCircle, AlertCircle, X } from 'lucide-react';
import { login, signup } from '../../lib/api';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: { id: string; name: string; email: string }) => void;
}

type AuthMode = 'login' | 'signup';

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

export default function AuthModal({ isOpen, onClose, onAuthSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>({ type: 'idle', message: '' });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setFormStatus({ type: 'idle', message: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (mode === 'signup') {
      if (!formData.name.trim()) {
        setFormStatus({ type: 'error', message: 'Name is required' });
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setFormStatus({ type: 'error', message: 'Passwords do not match' });
        return;
      }
      if (formData.password.length < 6) {
        setFormStatus({ type: 'error', message: 'Password must be at least 6 characters' });
        return;
      }
    }

    if (!formData.email.trim() || !formData.password) {
      setFormStatus({ type: 'error', message: 'Email and password are required' });
      return;
    }

    setFormStatus({ type: 'loading', message: mode === 'login' ? 'Logging in...' : 'Creating account...' });

    try {
      let result;

      if (mode === 'login') {
        result = await login({ email: formData.email, password: formData.password });
      } else {
        result = await signup({
          name: formData.name,
          email: formData.email,
          password: formData.password
        });
      }

      setFormStatus({
        type: 'success',
        message: mode === 'login' ? 'Login successful!' : 'Account created successfully!'
      });

      // Notify parent and close modal after success
      setTimeout(() => {
        onAuthSuccess(result.user);
        onClose();
        resetForm();
      }, 1500);

    } catch (error) {
      setFormStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Authentication failed'
      });
    }
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    setFormStatus({ type: 'idle', message: '' });
    setShowPassword(false);
  };

  const switchMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    resetForm();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-slate-800/95 backdrop-blur-sm border-2 border-cyan-400/30 rounded-2xl p-8 shadow-2xl shadow-cyan-500/10">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-2xl mb-4">
            {mode === 'login' ? (
              <LogIn className="w-8 h-8 text-white" />
            ) : (
              <UserPlus className="w-8 h-8 text-white" />
            )}
          </div>
          <h2 className="text-2xl font-black text-white">
            {mode === 'login' ? 'Welcome Back!' : 'Create Account'}
          </h2>
          <p className="text-gray-400 mt-2">
            {mode === 'login'
              ? 'Sign in to your account'
              : 'Sign up to get started'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name field (signup only) */}
          {mode === 'signup' && (
            <div className="relative">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="w-full bg-slate-700/50 border-2 border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:border-cyan-400/50 focus:outline-none transition-colors"
                />
              </div>
            </div>
          )}

          {/* Email field */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="you@example.com"
                className="w-full bg-slate-700/50 border-2 border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:border-cyan-400/50 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Password field */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="w-full bg-slate-700/50 border-2 border-white/10 rounded-xl py-3 pl-12 pr-12 text-white placeholder-gray-400 focus:border-cyan-400/50 focus:outline-none transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Confirm Password field (signup only) */}
          {mode === 'signup' && (
            <div className="relative">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="w-full bg-slate-700/50 border-2 border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:border-cyan-400/50 focus:outline-none transition-colors"
                />
              </div>
            </div>
          )}

          {/* Status Message */}
          {formStatus.type !== 'idle' && (
            <div className={`flex items-center gap-3 p-4 rounded-xl ${formStatus.type === 'success' ? 'bg-green-500/20 border border-green-400/30 text-green-400' :
                formStatus.type === 'error' ? 'bg-red-500/20 border border-red-400/30 text-red-400' :
                  'bg-cyan-500/20 border border-cyan-400/30 text-cyan-400'
              }`}>
              {formStatus.type === 'loading' && <Loader2 className="w-5 h-5 animate-spin" />}
              {formStatus.type === 'success' && <CheckCircle className="w-5 h-5" />}
              {formStatus.type === 'error' && <AlertCircle className="w-5 h-5" />}
              <span className="text-sm">{formStatus.message}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={formStatus.type === 'loading'}
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold py-3 px-8 rounded-xl hover:from-cyan-400 hover:to-purple-500 transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
          >
            {formStatus.type === 'loading' ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {mode === 'login' ? 'Signing in...' : 'Creating account...'}
              </>
            ) : (
              <>
                {mode === 'login' ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
                {mode === 'login' ? 'Sign In' : 'Sign Up'}
              </>
            )}
          </button>
        </form>

        {/* Switch mode */}
        <div className="mt-6 text-center">
          <p className="text-gray-400">
            {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
            <button
              onClick={switchMode}
              className="ml-2 text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
            >
              {mode === 'login' ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
