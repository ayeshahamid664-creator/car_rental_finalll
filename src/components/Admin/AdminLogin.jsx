import React, { useState } from 'react';
import { FaLock, FaUser, FaSignInAlt } from 'react-icons/fa';

const AdminLogin = ({ onLogin, theme }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // 🔐 YAHAN APNA USERNAME AUR PASSWORD SET KARO
  const ADMIN_USERNAME = 'ADMIN';
  const ADMIN_PASSWORD = 'carrental2026';

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Thoda delay for realism
    setTimeout(() => {
      if (
        credentials.username === ADMIN_USERNAME &&
        credentials.password === ADMIN_PASSWORD
      ) {
        sessionStorage.setItem('admin-auth', 'true');
        onLogin();
      } else {
        setError('Invalid username or password!');
      }
      setLoading(false);
    }, 600);
  };

  const inputCls = `w-full pl-12 pr-4 py-3.5 rounded-xl border outline-none text-sm transition-colors focus:border-yellow-500 ${
    theme === 'dark'
      ? 'bg-white/5 border-white/10 text-white placeholder-white/30'
      : 'bg-black/5 border-black/10 text-black placeholder-black/30'
  }`;

  return (
    <div className={`min-h-screen pt-32 pb-16 flex items-center justify-center px-4 ${
      theme === 'dark' ? 'bg-black text-white' : 'bg-gray-50 text-black'
    }`}>
      <div className={`w-full max-w-md p-8 sm:p-10 rounded-3xl border ${
        theme === 'dark'
          ? 'bg-gray-900 border-white/10'
          : 'bg-white border-black/10 shadow-xl'
      }`}>
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-yellow-500/15 text-yellow-500 flex items-center justify-center mb-5">
            <FaLock size={22} />
          </div>
          <p className="text-yellow-500 text-xs font-semibold tracking-[0.2em] uppercase mb-2">
            Restricted Access
          </p>
          <h1 className="font-serif text-3xl font-bold tracking-tight">
            Admin Login
          </h1>
          <p className="text-sm opacity-60 mt-2">
            Enter your credentials to continue
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-500" size={14} />
            <input
              type="text"
              placeholder="Username"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              required
              autoComplete="username"
              className={inputCls}
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-500" size={14} />
            <input
              type="password"
              placeholder="Password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              required
              autoComplete="current-password"
              className={inputCls}
            />
          </div>

          {error && (
            <div className="text-red-500 text-xs font-semibold text-center bg-red-500/10 py-3 rounded-xl">
              ⚠️ {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 text-black py-3.5 rounded-xl font-semibold text-sm hover:bg-yellow-400 transition-colors active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-yellow-500/20 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <FaSignInAlt size={13} />
            {loading ? 'Checking...' : 'Login'}
          </button>
        </form>

        {/* Hint (development ke liye — production mein hata dena) */}
        <p className="text-[10px] opacity-30 text-center mt-6 tracking-wide">
          Default: admin / carrental@2025
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;