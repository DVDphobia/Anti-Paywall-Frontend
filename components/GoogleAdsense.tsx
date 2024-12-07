'use client';

import Script from 'next/script'

export default function GoogleAdsense({ ADSENSE_ID }: { ADSENSE_ID: string }) {
  return (
    <Script
      id="adsbygoogle-init"
      strategy="afterInteractive"
      crossOrigin="anonymous"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
    />
  )
} 