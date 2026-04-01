"use client";

import { Sun } from 'lucide-react';
import { Moon } from 'lucide-react';
import { createContext, useContext, useState, useEffect } from 'react';

// Theme Context
const ThemeContext = createContext<{
  theme: string;
  toggleTheme: () => void;
}>({
  theme: 'dark',
  toggleTheme: () => void 0,
});

// Theme Provider Component
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light';
    // Check if user has a saved preference, otherwise use system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    
    // Check system preference
    if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    return 'light';
  });

  useEffect(() => {
    // Apply theme to document root
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    document.documentElement.setAttribute('data-theme', theme);
    
    // Save preference
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Theme Toggle Button Component
export const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
  
    return (
      <button
        onClick={toggleTheme}
        className="p-2 rounded-lg"
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? (
          <Moon className="w-5 h-5" />
        ) : (
          <Sun className="w-5 h-5" />
        )}
      </button>
    );
  };