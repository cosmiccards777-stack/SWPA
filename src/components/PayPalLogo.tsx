import React from 'react';

interface PayPalLogoProps {
  className?: string;
  height?: number;
}

// Official authentic high-resolution SVG directly from PayPal's official CDN
export function PayPalLogo({ className = 'h-5', height = 22 }: PayPalLogoProps) {
  return (
    <img
      src="https://www.paypalobjects.com/digitalassets/c/website/logo/full-text/pp_fc_hl.svg"
      alt="PayPal"
      style={{ height: `${height}px`, width: 'auto' }}
      className={`inline-block object-contain shrink-0 ${className}`}
    />
  );
}
