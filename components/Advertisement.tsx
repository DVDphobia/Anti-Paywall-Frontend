'use client';

import { useEffect } from 'react';

interface AdProps {
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle';
  style?: React.CSSProperties;
}

export default function Advertisement({ slot, format = 'auto', style }: AdProps) {
  useEffect(() => {
    try {
      // @ts-expect-error - AdSense types not available
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <div className="ad-container my-4">
      <ins
        className="adsbygoogle"
        style={style || { display: 'block' }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
} 