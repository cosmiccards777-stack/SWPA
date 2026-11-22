import React from 'react';

interface PayPalLogoProps {
  className?: string;
  height?: number;
}

export function PayPalLogo({ className = 'h-5', height = 20 }: PayPalLogoProps) {
  return (
    <svg
      height={height}
      viewBox="0 0 100 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="PayPal"
    >
      {/* Monogram P's */}
      <g>
        {/* Dark Blue Back 'P' */}
        <path
          d="M12.8 5.2C13.5 3.1 15.2 2 17.6 2H27.5C32.1 2 35.1 3.1 36.2 5.1C37.2 6.9 36.8 9.5 35.2 12.3C33.2 15.8 29.8 17.8 25.2 17.8H21.4C20.6 17.8 19.9 18.4 19.7 19.2L17.7 29.8C17.6 30.4 17.1 30.8 16.5 30.8H10.9C10.3 30.8 9.8 30.3 9.9 29.6L14.4 6.8C14.5 6.3 14.8 5.7 15.3 5.4C14.4 5.3 13.5 5.3 12.8 5.2Z"
          fill="#002F86"
        />
        {/* Light Blue Front 'P' */}
        <path
          d="M21.4 17.8H25.2C29.8 17.8 33.2 15.8 35.2 12.3C36.8 9.5 37.2 6.9 36.2 5.1C35.9 4.6 35.5 4.2 35 3.8C33.7 7.7 30.3 10.4 25.8 10.4H21.5C20.7 10.4 20 11 19.8 11.8L17.4 24.3L16.4 29.6C16.3 30.3 16.8 30.8 17.4 30.8H22.1C22.7 30.8 23.2 30.4 23.3 29.8L24.8 21.6C25 20.8 25.7 20.2 26.5 20.2H27.6C31.5 20.2 34.3 18.5 35.8 15.5C36.4 14.3 36.6 13.1 36.5 12C36.5 12.1 36.4 12.2 36.2 12.3C34.2 15.8 30.8 17.8 26.2 17.8H21.4Z"
          fill="#0079C1"
        />
        {/* Intersection Overlay */}
        <path
          d="M21.4 17.8C20.6 17.8 19.9 18.4 19.7 19.2L17.7 29.8C17.6 30.4 17.1 30.8 16.5 30.8H16.4C16.8 30.8 17.2 30.4 17.3 29.8L18.3 24.5L19.8 16.8C20 16 20.7 15.4 21.5 15.4H25.8C28.4 15.4 30.7 14.3 32.3 12.5C30.6 15.8 26.6 17.8 21.4 17.8Z"
          fill="#002F86"
          opacity="0.35"
        />
      </g>
      {/* Official PayPal Wordmark */}
      <g fill="#003087">
        <text
          x="42"
          y="23"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
          fontWeight="800"
          fontStyle="italic"
          fontSize="22"
          letterSpacing="-0.5px"
        >
          <tspan fill="#002F86">Pay</tspan>
          <tspan fill="#0079C1">Pal</tspan>
        </text>
      </g>
    </svg>
  );
}

export function PayPalPillButton({
  onClick,
  className = '',
  disabled = false,
  subtext = 'Buy now with PayPal'
}: {
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  subtext?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`group relative w-full h-[48px] bg-[#FFC439] hover:bg-[#F4BB34] active:bg-[#E0A82E] transition-all rounded-full flex items-center justify-center shadow-[0_2px_4px_rgba(0,0,0,0.15)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.2)] disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      aria-label={subtext}
    >
      <div className="flex items-center justify-center gap-1.5 pointer-events-none">
        <span className="text-[14px] font-semibold text-[#2C2E2F] tracking-tight font-sans">
          Buy with
        </span>
        <PayPalLogo height={22} className="h-[22px]" />
      </div>
    </button>
  );
}
