import React, { useState, useEffect } from 'react';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { AnimatePresence, motion } from 'framer-motion';
import { Building } from 'lucide-react';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);

  // Civic issue backgrounds
  const civicImages = [
    'https://images.unsplash.com/photo-1508599589920-3eeb6c6d9f2d?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1605722196642-b6c9f05f0c3f?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1538391547548-7f2d18f3cba7?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1573497019369-2b1b2d43eeb4?auto=format&fit=crop&w=1920&q=80',
  ];

  // Pick random background each time component mounts
  const [civicThemeBackground, setCivicThemeBackground] = useState('');

  useEffect(() => {
    const randomImage = civicImages[Math.floor(Math.random() * civicImages.length)];
    setCivicThemeBackground(randomImage);
  }, []);

  const formVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Image Layer */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${civicThemeBackground})` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 0.8 }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-gray-900 opacity-20"></div>

      <div className="w-full max-w-md z-10">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mb-4 shadow-md">
            <Building className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 tracking-tight">CityPulse</h1>
          <p className="text-gray-500 mt-2 text-lg">Your Voice for a Better City</p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={isLogin ? 'login' : 'register'}
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            {isLogin ? (
              <LoginForm onSwitchToRegister={() => setIsLogin(false)} />
            ) : (
              <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} CityPulse. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
