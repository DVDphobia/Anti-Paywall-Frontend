'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { NewspaperIcon } from '@heroicons/react/24/outline';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-white dark:bg-gray-800 shadow transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <NewspaperIcon className="h-8 w-8 dark:text-white" />
            <span className="text-xl font-semibold dark:text-white">Bypass Paywall</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link 
                  href="/history" 
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                >
                  History
                </Link>
                <button
                  onClick={logout}
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                >
                  Login
                </Link>
                <Link 
                  href="/register" 
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                >
                  Register
                </Link>
              </>
            )}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
} 