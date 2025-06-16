import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AdminLogin from './AdminLogin';
import AdminSignup from './AdminSignup';
import AdminDashboard from './AdminDashboard';

const AdminButton: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const { user, isAdmin, loading } = useAuth();

  if (loading) return null;

  const handleClick = () => {
    // Check if there's a specific action requested from the header
    const authAction = (window as any).authAction;
    
    if (user && isAdmin) {
      setShowDashboard(true);
    } else if (authAction === 'signup') {
      setShowSignup(true);
      // Clear the action
      (window as any).authAction = null;
    } else {
      setShowLogin(true);
      // Clear the action
      (window as any).authAction = null;
    }
  };

  return (
    <>
      <motion.button
        onClick={handleClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-colors z-40"
        title={user && isAdmin ? 'Open Admin Dashboard' : 'Admin Access'}
      >
        <Settings className="w-6 h-6" />
      </motion.button>

      <AnimatePresence>
        {showLogin && (
          <AdminLogin 
            onClose={() => setShowLogin(false)}
            onSwitchToSignup={() => {
              setShowLogin(false);
              setShowSignup(true);
            }}
          />
        )}
        {showSignup && (
          <AdminSignup 
            onClose={() => setShowSignup(false)}
            onSwitchToLogin={() => {
              setShowSignup(false);
              setShowLogin(true);
            }}
          />
        )}
        {showDashboard && (
          <AdminDashboard onClose={() => setShowDashboard(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminButton;