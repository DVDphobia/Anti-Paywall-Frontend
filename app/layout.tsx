'use client';

import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import GoogleAdsense from '@/components/GoogleAdsense';
import { useEffect } from 'react';
import './globals.css';
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bypass Paywall - Access Articles Freely',
  description: 'Access articles behind paywalls with ease. Read premium content from various websites without restrictions.',
  keywords: 'paywall bypass, article reader, content access, premium articles',
  openGraph: {
    title: 'Bypass Paywall - Access Articles Freely',
    description: 'Access articles behind paywalls with ease. Read premium content from various websites.',
    url: 'http://dvdphobia.teach',
    siteName: 'Bypass Paywall',
    images: [
      {
        url: '', // Add your Open Graph image
        width: 1200,
        height: 630,
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Add this after setting up Google Search Console
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_ID;

  useEffect(() => {
    // Check initial theme on mount
    if (localStorage.theme === 'dark' || 
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            try {
              if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark')
              } else {
                document.documentElement.classList.remove('dark')
              }
            } catch (_) {}
          `
        }} />
      </head>
      <body className="bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        {GA_MEASUREMENT_ID && <GoogleAnalytics GA_MEASUREMENT_ID={GA_MEASUREMENT_ID} />}
        {ADSENSE_ID && <GoogleAdsense ADSENSE_ID={ADSENSE_ID} />}
        <AuthProvider>
          <Navbar />
          <main>
            {children}
          </main>
          <Toaster 
            position="bottom-right"
            toastOptions={{
              className: 'dark:bg-gray-800 dark:text-white'
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
