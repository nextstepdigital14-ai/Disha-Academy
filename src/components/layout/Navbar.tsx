import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Compass,
  Menu,
  X,
  Search,
  Moon,
  Sun,
  User,
  ShieldCheck,
  ChevronDown,
  GraduationCap,
  FileText,
  CheckCircle2,
  PhoneCall,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { GlobalSearchModal } from './GlobalSearchModal';

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCoursesDropdownOpen, setIsCoursesDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const { user, isAdmin, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    setIsUserDropdownOpen(false);
    navigate('/');
  };

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <header className="sticky top-0 z-30 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Brand Logo & Name */}
          <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-700 via-navy-800 to-navy-900 flex items-center justify-center text-white shadow-md shadow-brand-500/10 group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6 text-amber-400 group-hover:rotate-45 transition-transform duration-500" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-navy-900 dark:text-white leading-none">
                  DISHA
                </span>
                <span className="font-semibold text-xs tracking-wider uppercase px-1.5 py-0.5 rounded bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
                  ACADEMY
                </span>
              </div>
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 tracking-wide">
                & Olympiad School • Kolhapur
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 font-medium text-sm">
            <Link
              to="/"
              className={`px-3 py-2 rounded-lg transition-colors ${
                isActive('/') && location.pathname === '/'
                  ? 'text-brand-600 dark:text-brand-400 font-semibold bg-brand-50/70 dark:bg-brand-950/40'
                  : 'text-slate-600 dark:text-slate-300 hover:text-navy-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/50'
              }`}
            >
              Home
            </Link>

            {/* Courses Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsCoursesDropdownOpen(true)}
              onMouseLeave={() => setIsCoursesDropdownOpen(false)}
            >
              <Link
                to="/courses"
                className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1 ${
                  isActive('/courses')
                    ? 'text-brand-600 dark:text-brand-400 font-semibold bg-brand-50/70 dark:bg-brand-950/40'
                    : 'text-slate-600 dark:text-slate-300 hover:text-navy-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/50'
                }`}
              >
                <span>Courses</span>
                <ChevronDown className="w-4 h-4 opacity-70" />
              </Link>

              {isCoursesDropdownOpen && (
                <div className="absolute top-full left-0 w-64 pt-2 z-50">
                  <div className="bg-white dark:bg-slate-900 rounded-xl shadow-premium border border-slate-200 dark:border-slate-800 p-2 space-y-1">
                    <Link
                      to="/courses/mht-cet"
                      onClick={() => setIsCoursesDropdownOpen(false)}
                      className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold text-xs">
                        CET
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-200">MHT-CET Program</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">Engineering & Pharmacy</p>
                      </div>
                    </Link>

                    <Link
                      to="/courses/jee"
                      onClick={() => setIsCoursesDropdownOpen(false)}
                      className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs">
                        JEE
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-200">JEE (Main & Adv)</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">IITs & NITs Track</p>
                      </div>
                    </Link>

                    <Link
                      to="/courses/neet"
                      onClick={() => setIsCoursesDropdownOpen(false)}
                      className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs">
                        NEET
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-200">NEET-UG Medical</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">MBBS & BDS Foundation</p>
                      </div>
                    </Link>

                    <div className="pt-1 mt-1 border-t border-slate-100 dark:border-slate-800">
                      <Link
                        to="/courses"
                        onClick={() => setIsCoursesDropdownOpen(false)}
                        className="text-xs text-brand-600 dark:text-brand-400 font-semibold p-2 block hover:underline"
                      >
                        Compare All Courses →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/notes"
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                isActive('/notes')
                  ? 'text-brand-600 dark:text-brand-400 font-semibold bg-brand-50/70 dark:bg-brand-950/40'
                  : 'text-slate-600 dark:text-slate-300 hover:text-navy-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/50'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Notes & Study Material</span>
            </Link>

            <Link
              to="/mcq-practice"
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                isActive('/mcq-practice')
                  ? 'text-brand-600 dark:text-brand-400 font-semibold bg-brand-50/70 dark:bg-brand-950/40'
                  : 'text-slate-600 dark:text-slate-300 hover:text-navy-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/50'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>MCQ Practice</span>
            </Link>

            <Link
              to="/about"
              className={`px-3 py-2 rounded-lg transition-colors ${
                isActive('/about')
                  ? 'text-brand-600 dark:text-brand-400 font-semibold bg-brand-50/70 dark:bg-brand-950/40'
                  : 'text-slate-600 dark:text-slate-300 hover:text-navy-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/50'
              }`}
            >
              About
            </Link>

            <Link
              to="/contact"
              className={`px-3 py-2 rounded-lg transition-colors ${
                isActive('/contact')
                  ? 'text-brand-600 dark:text-brand-400 font-semibold bg-brand-50/70 dark:bg-brand-950/40'
                  : 'text-slate-600 dark:text-slate-300 hover:text-navy-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/50'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2.5">
            {/* Global Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5"
              title="Search notes, courses, questions (Ctrl+K)"
            >
              <Search className="w-4 h-4" />
              <span className="hidden xl:inline text-xs text-slate-400 font-mono">⌘K</span>
            </button>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-500 hover:text-amber-500 dark:text-slate-400 dark:hover:text-amber-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Auth Dropdown / Login */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-brand-600 text-white flex items-center justify-center font-bold text-xs uppercase">
                    {user.displayName.charAt(0) || 'U'}
                  </div>
                  <div className="hidden sm:block text-left text-xs">
                    <p className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[100px]">{user.displayName}</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase">{user.role}</p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-slate-900 rounded-xl shadow-premium border border-slate-200 dark:border-slate-800 p-2 z-50">
                    <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 mb-1">
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-100">{user.displayName}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                    </div>

                    {isAdmin ? (
                      <Link
                        to="/admin"
                        onClick={() => setIsUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-950/50"
                      >
                        <ShieldCheck className="w-4 h-4" /> Admin Portal
                      </Link>
                    ) : (
                      <Link
                        to="/dashboard"
                        onClick={() => setIsUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        <User className="w-4 h-4" /> Student Dashboard
                      </Link>
                    )}

                    <Link
                      to="/notes"
                      onClick={() => setIsUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <FileText className="w-4 h-4" /> My Notes
                    </Link>

                    <Link
                      to="/mcq-practice"
                      onClick={() => setIsUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <CheckCircle2 className="w-4 h-4" /> MCQ Practice
                    </Link>

                    <div className="pt-1 mt-1 border-t border-slate-100 dark:border-slate-800">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-left font-medium"
                      >
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-400 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <User className="w-3.5 h-3.5" />
                <span>Student Login</span>
              </Link>
            )}

            {/* Enquire Now CTA Button */}
            <Link
              to="/admissions"
              className="bg-brand-600 hover:bg-brand-700 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl shadow-md hover:shadow-glow transition-all duration-200 flex items-center gap-1.5 flex-shrink-0"
            >
              <span>Enquire Now</span>
            </Link>

            {/* Mobile Menu Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:text-navy-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu Sheet */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-4 duration-200">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Home
            </Link>
            <Link
              to="/courses"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Courses (MHT-CET, JEE, NEET)
            </Link>
            <Link
              to="/notes"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Notes & Study Material
            </Link>
            <Link
              to="/mcq-practice"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Online MCQ Practice
            </Link>
            <Link
              to="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              About Academy & Faculty
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Contact & Location
            </Link>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
              {user ? (
                <>
                  <Link
                    to={isAdmin ? '/admin' : '/dashboard'}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl text-sm font-semibold"
                  >
                    {isAdmin ? <ShieldCheck className="w-4 h-4 text-brand-600" /> : <User className="w-4 h-4 text-brand-600" />}
                    <span>{isAdmin ? 'Admin Dashboard' : 'Student Portal'}</span>
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full py-2 text-rose-600 dark:text-rose-400 text-sm font-semibold"
                  >
                    Sign Out ({user.displayName})
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="py-2.5 text-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-sm"
                  >
                    Student Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="py-2.5 text-center rounded-xl bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 border border-brand-200 dark:border-brand-800 font-semibold text-sm"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <GlobalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
