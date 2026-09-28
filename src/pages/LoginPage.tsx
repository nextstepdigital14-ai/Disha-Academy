import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Compass, Mail, Lock, ArrowRight, AlertCircle, CheckCircle2, ShieldCheck, KeyRound } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Forgot password state
  const [isForgotOpen, setIsForgotOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);

  const { login, resetPassword } = useAuth();
  const { showToast } = useNotification();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/dashboard';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const user = await login(email, password);
      showToast(`Welcome back, ${user.displayName}!`, 'success');
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate(from === '/login' || from === '/register' ? '/dashboard' : from);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Invalid login credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await resetPassword(resetEmail);
      setResetSuccess(true);
      showToast('Password reset link sent to your email!', 'info');
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : 'Reset failed', 'error');
    }
  };

  const fillDemoAccount = (role: 'student' | 'admin') => {
    if (role === 'student') {
      setEmail('student@dishaacademy.com');
      setPassword('student123');
    } else {
      setEmail('admin@dishaacademy.com');
      setPassword('admin123');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-premium">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-brand-600 text-white flex items-center justify-center mx-auto shadow-md">
            <Compass className="w-6 h-6 text-amber-400" />
          </div>
          <h2 className="text-2xl font-extrabold text-navy-950 dark:text-white">
            Sign In to Student Portal
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Access chapter study notes, online CBT mocks, and test performance records.
          </p>
        </div>

        {/* Quick Demo Credentials Autofill Helper */}
        <div className="p-3.5 rounded-2xl bg-brand-50/70 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-900/60 text-xs space-y-2">
          <p className="font-bold text-brand-900 dark:text-brand-300 text-[11px] uppercase tracking-wider">
            ⚡ Quick Demo Logins:
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => fillDemoAccount('student')}
              className="flex-1 py-1.5 px-2 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-[11px] shadow-sm hover:bg-slate-100"
            >
              Demo Student
            </button>
            <button
              type="button"
              onClick={() => fillDemoAccount('admin')}
              className="flex-1 py-1.5 px-2 rounded-lg bg-white dark:bg-slate-800 text-purple-700 dark:text-purple-300 font-bold text-[11px] shadow-sm hover:bg-slate-100"
            >
              Demo Admin
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3.5 bg-rose-50 text-rose-700 rounded-2xl border border-rose-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4 text-xs sm:text-sm">
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@dishaacademy.com"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block font-bold text-slate-700 dark:text-slate-300">
                Password
              </label>
              <button
                type="button"
                onClick={() => {
                  setResetEmail(email);
                  setIsForgotOpen(true);
                }}
                className="text-[11px] font-semibold text-brand-600 dark:text-brand-400 hover:underline"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-colors disabled:opacity-50"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In to Portal'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Footer Link */}
        <div className="text-center pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
          <span>New student at Disha Academy? </span>
          <Link to="/register" className="font-bold text-brand-600 dark:text-brand-400 hover:underline">
            Register for Free →
          </Link>
        </div>

      </div>

      {/* Forgot Password Modal */}
      {isForgotOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="font-bold text-base text-navy-950 dark:text-white flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-brand-600" />
              Reset Account Password
            </h3>

            {resetSuccess ? (
              <div className="p-4 bg-emerald-50 text-emerald-800 rounded-2xl text-xs space-y-2 text-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <p className="font-bold">Password Reset Email Dispatched</p>
                <p>Check your email for the password recovery link.</p>
                <button
                  type="button"
                  onClick={() => setIsForgotOpen(false)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs"
                >
                  Back to Sign In
                </button>
              </div>
            ) : (
              <form onSubmit={handleResetPassword} className="space-y-4 text-xs">
                <p className="text-slate-500">
                  Enter your registered student email and we will send you a secure link to reset your password.
                </p>
                <input
                  type="email"
                  required
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="student@dishaacademy.com"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsForgotOpen(false)}
                    className="flex-1 py-2 rounded-xl border font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 rounded-xl bg-brand-600 text-white font-bold"
                  >
                    Send Reset Link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
