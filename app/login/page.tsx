'use client';
import React, { useState } from 'react';

type FormMode = 'login' | 'signup' | 'forgot';

export default function App() {
  const [formMode, setFormMode] = useState<FormMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
  const [fullNameFocused, setFullNameFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formMode === 'login') {
      console.log('Login attempted with:', { email, password });
    } else if (formMode === 'signup') {
      console.log('Signup attempted with:', { fullName, email, password, confirmPassword });
    } else {
      console.log('Password reset requested for:', email);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setFullName('');
  };

  const switchMode = (mode: FormMode) => {
    setFormMode(mode);
    resetForm();
  };

  return (
    <div className="size-full min-h-screen flex relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #f8faf9 0%, #e8f5f0 25%, #ffffff 50%, #f0f9f6 75%, #e3f5ed 100%)' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');

        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          33% { transform: translateY(-30px) translateX(20px) rotate(5deg); }
          66% { transform: translateY(20px) translateX(-15px) rotate(-3deg); }
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.25; transform: scale(1.05); }
        }

        @keyframes slide-fade-in {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes expand-circle {
          0% { transform: scale(0.8); opacity: 0.1; }
          50% { transform: scale(1.1); opacity: 0.15; }
          100% { transform: scale(0.8); opacity: 0.1; }
        }

        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }

        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .float-anim { animation: float 20s ease-in-out infinite; }
        .float-anim-delay { animation: float 25s ease-in-out infinite 5s; }
        .pulse-glow { animation: pulse-glow 4s ease-in-out infinite; }
        .slide-fade-in { animation: slide-fade-in 0.6s ease-out forwards; }
        .expand-circle-1 { animation: expand-circle 8s ease-in-out infinite; }
        .expand-circle-2 { animation: expand-circle 10s ease-in-out infinite 2s; }
        .expand-circle-3 { animation: expand-circle 12s ease-in-out infinite 4s; }

        .shimmer-bg {
          background: linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.1), transparent);
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }

        .gradient-text {
          background: linear-gradient(135deg, #1E293B 0%, #10B981 50%, #059669 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradient-shift 6s ease infinite;
        }

        .input-field {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .input-field:focus {
          transform: translateY(-2px);
        }

        .glass-card {
          backdrop-filter: blur(20px) saturate(180%);
          background: rgba(255, 255, 255, 0.75);
          border: 1px solid rgba(16, 185, 129, 0.08);
          box-shadow: 0 8px 32px rgba(16, 185, 129, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.5);
        }

        .btn-primary {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .btn-primary::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }

        .btn-primary:hover::before {
          width: 300px;
          height: 300px;
        }

        .btn-primary:active {
          transform: scale(0.98);
        }

        .btn-secondary {
          transition: all 0.3s ease;
        }

        .btn-secondary:hover {
          transform: translateX(-4px);
        }
      `}</style>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating Orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 rounded-full bg-gradient-to-br from-emerald-200/30 to-emerald-400/20 blur-3xl float-anim" />
        <div className="absolute bottom-40 right-40 w-80 h-80 rounded-full bg-gradient-to-tr from-teal-200/25 to-green-300/20 blur-3xl float-anim-delay" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-gradient-to-bl from-emerald-100/30 to-emerald-300/15 blur-2xl pulse-glow" />

        {/* Geometric Shapes */}
        <div className="absolute top-10 right-1/4 w-32 h-32 border-2 border-emerald-200/30 rounded-2xl rotate-12 float-anim" style={{ animation: 'float 15s ease-in-out infinite' }} />
        <div className="absolute bottom-20 left-1/4 w-24 h-24 border-2 border-teal-200/25 rounded-full float-anim-delay" />
      </div>

      {/* Left Section - Login Form (40%) */}
      <div className="w-full lg:w-2/5 flex items-center justify-center p-8 lg:p-16 relative z-10">
        {/* Glassmorphism Container */}
        <div className="w-full max-w-md relative my-auto">
          {/* Subtle background watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none overflow-hidden">
            <div className="text-[20rem] tracking-wider" style={{ fontFamily: 'Playfair Display, serif' }}>
              A
            </div>
          </div>

          {/* Main Content - Floating Card */}
          <div className="relative glass-card rounded-3xl p-10 lg:p-12 shadow-[0_8px_32px_rgba(16,185,129,0.12)] slide-fade-in">
            {/* Logo and Brand */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-200/50">
                  <span className="text-white" style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.25rem' }}>A</span>
                </div>
                <h1
                  className="text-[#1E293B] tracking-[0.15em] uppercase"
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    letterSpacing: '0.15em'
                  }}
                >
                  AFYAKUL
                </h1>
              </div>
              <p
                className="text-[#64748B]"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.8125rem',
                  fontWeight: 300,
                  lineHeight: 1.6
                }}
              >
                {formMode === 'login' && 'The future of ethical finance.'}
                {formMode === 'signup' && 'Begin your journey with us.'}
                {formMode === 'forgot' && 'Recover your account access.'}
              </p>
            </div>

            {/* Form Title - Luxurious */}
            <div className="mb-8 relative">
              {formMode !== 'login' && (
                <button
                  type="button"
                  onClick={() => switchMode('login')}
                  className="flex items-center gap-2 text-[#64748B] hover:text-[#10B981] mb-4 btn-secondary"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.8125rem',
                    fontWeight: 400
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 13L5 8L10 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Back to Login
                </button>
              )}
              <h2
                className="gradient-text relative"
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '2.25rem',
                  fontWeight: 600,
                  lineHeight: 1.2,
                  letterSpacing: '-0.02em'
                }}
              >
                {formMode === 'login' && 'Welcome Back'}
                {formMode === 'signup' && 'Create Account'}
                {formMode === 'forgot' && 'Reset Password'}
              </h2>
              {/* Decorative underline */}
              <div className="mt-3 h-[2px] w-20 bg-gradient-to-r from-emerald-400 to-transparent rounded-full" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-7">
              {/* Full Name Field (Signup Only) */}
              {formMode === 'signup' && (
                <div className="relative slide-fade-in">
                  <label
                    htmlFor="fullName"
                    className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                      fullNameFocused || fullName
                        ? '-top-6 text-[#10B981]'
                        : 'top-0 text-[#94A3B8]'
                    }`}
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: fullNameFocused || fullName ? '0.75rem' : '0.9375rem',
                      fontWeight: 400
                    }}
                  >
                    {fullNameFocused || fullName ? 'Full Name' : 'Enter your full name'}
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    onFocus={() => setFullNameFocused(true)}
                    onBlur={() => setFullNameFocused(false)}
                    className="w-full bg-transparent border-0 border-b-[1.5px] border-[#E2E8F0] focus:border-[#10B981] outline-none py-3 input-field"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.9375rem',
                      fontWeight: 400,
                      color: '#1E293B'
                    }}
                    required
                  />
                </div>
              )}

              {/* Email Field */}
              <div className="relative">
                <label
                  htmlFor="email"
                  className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                    emailFocused || email
                      ? '-top-6 text-[#10B981]'
                      : 'top-0 text-[#94A3B8]'
                  }`}
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: emailFocused || email ? '0.75rem' : '0.9375rem',
                    fontWeight: 400
                  }}
                >
                  {emailFocused || email ? 'Email Address' : 'Enter your secure email'}
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  className="w-full bg-transparent border-0 border-b-[1.5px] border-[#E2E8F0] focus:border-[#10B981] outline-none py-3 input-field"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.9375rem',
                    fontWeight: 400,
                    color: '#1E293B'
                  }}
                  required
                />
              </div>

              {/* Password Field (Login & Signup) */}
              {formMode !== 'forgot' && (
                <div className="relative">
                  <label
                    htmlFor="password"
                    className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                      passwordFocused || password
                        ? '-top-6 text-[#10B981]'
                        : 'top-0 text-[#94A3B8]'
                    }`}
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: passwordFocused || password ? '0.75rem' : '0.9375rem',
                      fontWeight: 400
                    }}
                  >
                    {passwordFocused || password ? 'Password' : 'Enter your password'}
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                    className="w-full bg-transparent border-0 border-b-[1.5px] border-[#E2E8F0] focus:border-[#10B981] outline-none py-3 input-field"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.9375rem',
                      fontWeight: 400,
                      color: '#1E293B'
                    }}
                    required
                  />
                </div>
              )}

              {/* Confirm Password Field (Signup Only) */}
              {formMode === 'signup' && (
                <div className="relative slide-fade-in">
                  <label
                    htmlFor="confirmPassword"
                    className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                      confirmPasswordFocused || confirmPassword
                        ? '-top-6 text-[#10B981]'
                        : 'top-0 text-[#94A3B8]'
                    }`}
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: confirmPasswordFocused || confirmPassword ? '0.75rem' : '0.9375rem',
                      fontWeight: 400
                    }}
                  >
                    {confirmPasswordFocused || confirmPassword ? 'Confirm Password' : 'Confirm your password'}
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onFocus={() => setConfirmPasswordFocused(true)}
                    onBlur={() => setConfirmPasswordFocused(false)}
                    className="w-full bg-transparent border-0 border-b-[1.5px] border-[#E2E8F0] focus:border-[#10B981] outline-none py-3 input-field"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.9375rem',
                      fontWeight: 400,
                      color: '#1E293B'
                    }}
                    required
                  />
                </div>
              )}

              {/* Forgot Password Link (Login Only) */}
              {formMode === 'login' && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => switchMode('forgot')}
                    className="text-[#1E293B] hover:text-[#10B981] transition-colors duration-300"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.8125rem',
                      fontWeight: 400
                    }}
                  >
                    Forgot Password?
                  </button>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#10B981] text-white rounded-full py-4 hover:bg-[#059669] shadow-[0_4px_20px_rgba(167,243,208,0.4)] hover:shadow-[0_6px_28px_rgba(167,243,208,0.6)] btn-primary relative z-10"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase'
                }}
              >
                {formMode === 'login' && 'Sign In'}
                {formMode === 'signup' && 'Create Account'}
                {formMode === 'forgot' && 'Send Reset Link'}
              </button>

              {/* Mode Switcher */}
              {formMode === 'login' && (
                <div className="text-center pt-4">
                  <span
                    className="text-[#64748B]"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.875rem',
                      fontWeight: 400
                    }}
                  >
                    New to Afyakul?{' '}
                  </span>
                  <button
                    type="button"
                    onClick={() => switchMode('signup')}
                    className="text-[#1E293B] hover:text-[#10B981] transition-colors duration-300"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.875rem',
                      fontWeight: 500
                    }}
                  >
                    Create Account
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Right Section - Visual Background (60%) */}
      <div className="hidden lg:flex lg:w-3/5 relative overflow-hidden">
        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0">
          <div className="shimmer-bg absolute inset-0 opacity-30" />
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Expanding Circles */}
          <div className="absolute w-[700px] h-[700px] rounded-full border-[2px] border-[#10B981]/10 -translate-x-32 expand-circle-1" />
          <div className="absolute w-[550px] h-[550px] rounded-full border-[2px] border-[#10B981]/15 translate-x-24 translate-y-32 expand-circle-2" />
          <div className="absolute w-[400px] h-[400px] rounded-full border-[1px] border-emerald-300/20 -translate-y-16 expand-circle-3" />

          {/* Floating Decorative Lines */}
          <div className="absolute top-1/4 right-1/4 w-48 h-0.5 bg-gradient-to-r from-transparent via-emerald-300/30 to-transparent rotate-45 float-anim" />
          <div className="absolute bottom-1/3 left-1/4 w-32 h-0.5 bg-gradient-to-r from-transparent via-teal-300/25 to-transparent -rotate-12 float-anim-delay" />

          {/* Elegant Typography Element */}
          <div className="text-center px-16 relative z-10">
            <h2
              className="text-[#1E293B]/[0.06] mb-8 leading-tight"
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '6rem',
                fontWeight: 400,
                letterSpacing: '0.02em'
              }}
            >
              Welcome
            </h2>
            <p
              className="text-[#1E293B]/20 max-w-md mx-auto"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '1rem',
                fontWeight: 300,
                lineHeight: 1.8,
                letterSpacing: '0.02em'
              }}
            >
              Exclusive access to a new generation of ethical financial services, designed for those who value transparency and integrity.
            </p>
          </div>
        </div>

        {/* Corner Accents */}
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-tl from-[#10B981]/8 to-transparent rounded-tl-full blur-2xl pulse-glow" />
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-emerald-200/10 to-transparent rounded-br-full blur-xl float-anim" />
      </div>
    </div>
  );
}
