import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Sun, Moon, Globe, LogIn, LogOut, UserPlus } from 'lucide-react';
import { useLanguage, languages } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const { user, isAdmin, signOut } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { key: 'home', href: '/#home' },
    { key: 'projects', href: '/#projects' },
    { key: 'resume', href: '/#resume' },
    { key: 'portfolio', href: '/#portfolio' },
    { key: 'blog', href: '/#blog' },
    { key: 'contact', href: '/#contact' }
  ];

  const toggleLanguage = () => {
    const newLang = language.code === 'en' ? languages.ar : languages.en;
    setLanguage(newLang);
  };

  const handleSignOut = async () => {
    await signOut();
    setIsMenuOpen(false);
  };

  const handleAuthClick = (action: 'login' | 'signup' = 'login') => {
    // This will trigger the admin button functionality
    const adminButton = document.querySelector('[title*="Admin"]') as HTMLButtonElement;
    if (adminButton) {
      // Store the action type for the admin button to know what to show
      (window as any).authAction = action;
      adminButton.click();
    }
    setIsMenuOpen(false);
  };

  const handleMenuItemClick = (href: string) => {
    setIsMenuOpen(false);
    
    // If we're on a project detail page and clicking a home section link
    if (location.pathname !== '/' && href.startsWith('/#')) {
      // Navigate to home first, then scroll to section
      window.location.href = href;
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center"
          >
            <Link to="/">
              <img 
                src="/artboard-6.png" 
                alt="Logo" 
                className="h-24 w-auto"
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 rtl:space-x-reverse">
            {menuItems.map((item) => (
              <motion.a
                key={item.key}
                href={item.href}
                whileHover={{ y: -2 }}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200"
                onClick={() => handleMenuItemClick(item.href)}
              >
                {t(item.key)}
              </motion.a>
            ))}
          </nav>

          {/* Controls */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>

            {/* Language Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleLanguage}
              className="flex items-center space-x-2 rtl:space-x-reverse p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <Globe size={20} />
              <span className="text-sm font-medium">{language.code.toUpperCase()}</span>
            </motion.button>

            {/* Mobile Menu Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.nav
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isMenuOpen ? 1 : 0, 
            height: isMenuOpen ? 'auto' : 0 
          }}
          className="lg:hidden overflow-hidden bg-white dark:bg-gray-900 rounded-lg mt-2 shadow-lg"
        >
          <div className="py-4 space-y-2">
            {/* Navigation Links */}
            {menuItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                onClick={() => handleMenuItemClick(item.href)}
                className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {t(item.key)}
              </a>
            ))}
            
            {/* Divider */}
            <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
            
            {/* Authentication Links */}
            {user ? (
              <>
                {isAdmin && (
                  <button
                    onClick={() => handleAuthClick('login')}
                    className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center"
                  >
                    <UserPlus size={18} className={`mr-3 rtl:mr-0 rtl:ml-3`} />
                    {language.code === 'en' ? 'Admin Dashboard' : 'لوحة الإدارة'}
                  </button>
                )}
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center"
                >
                  <LogOut size={18} className={`mr-3 rtl:mr-0 rtl:ml-3`} />
                  {language.code === 'en' ? 'Log Out' : 'تسجيل الخروج'}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleAuthClick('login')}
                  className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center"
                >
                  <LogIn size={18} className={`mr-3 rtl:mr-0 rtl:ml-3`} />
                  {language.code === 'en' ? 'Admin Sign In' : 'تسجيل دخول الإدارة'}
                </button>
                <button
                  onClick={() => handleAuthClick('signup')}
                  className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center"
                >
                  <UserPlus size={18} className={`mr-3 rtl:mr-0 rtl:ml-3`} />
                  {language.code === 'en' ? 'Admin Sign Up' : 'إنشاء حساب إدارة'}
                </button>
              </>
            )}
          </div>
        </motion.nav>
      </div>
    </motion.header>
  );
};

export default Header;