import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import GoogleAdsense from '@/components/GoogleAdsense';
import './globals.css';
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bypass Paywall - Access Articles Freely',
  description: 'Access articles behind paywalls with ease. Read premium content from various websites without restrictions.',
  keywords: 'paywall bypass, article reader, content access, premium articles',
  openGraph: {
    title: 'Bypass Paywall - Access Articles Freely',
    description: 'Access articles behind paywalls with ease. Read premium content from various websites.',
    url: 'http://dvdphobia.teach',
    siteName: 'Bypass Paywall',
    locale: 'en_US',
    type: 'website',
  },
};

function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_ID;

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        {GA_MEASUREMENT_ID && <GoogleAnalytics GA_MEASUREMENT_ID={GA_MEASUREMENT_ID} />}
        {ADSENSE_ID && <GoogleAdsense ADSENSE_ID={ADSENSE_ID} />}
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <Toaster position="bottom-right" />
        </AuthProvider>
      </body>
    </html>
  );
}

export default RootLayout;
