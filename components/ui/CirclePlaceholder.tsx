import React from "react";

interface CirclePlaceholderProps {
  className?: string;
  children?: React.ReactNode;
}

export function CirclePlaceholder({ className = "", children }: CirclePlaceholderProps) {
  return (
    <div className={`relative rounded-full bg-zinc-200 border border-zinc-300 overflow-hidden ${className}`}>
      <svg
        className="absolute inset-0 w-full h-full text-zinc-300 stroke-current"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <line x1="0" y1="0" x2="100" y2="100" strokeWidth="1" />
        <line x1="100" y1="0" x2="0" y2="100" strokeWidth="1" />
      </svg>
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
}
