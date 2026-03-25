"use client";

import { motion } from "framer-motion";

interface CTAButtonProps {
  platform: "ios" | "android";
  onClick: () => void;
  size?: "default" | "large";
}

// Apple 로고 SVG
function AppleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

// Google Play 로고 SVG
function PlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302a1 1 0 010 1.38l-2.302 2.302L15.395 12l2.303-2.492zM5.864 2.658L16.8 8.99l-2.302 2.302-8.635-8.635z" />
    </svg>
  );
}

export default function CTAButton({ platform, onClick, size = "default" }: CTAButtonProps) {
  const isIOS = platform === "ios";
  const sizeClass =
    size === "large"
      ? "px-7 py-3.5 text-base gap-3"
      : "px-5 py-2.5 text-sm gap-2.5";

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-xl font-medium transition-colors ${sizeClass} ${
        isIOS
          ? "bg-gray-950 text-white hover:bg-gray-800"
          : "border border-gray-300 bg-white text-gray-950 hover:bg-gray-50"
      }`}
    >
      {isIOS ? (
        <AppleIcon className="h-5 w-5" />
      ) : (
        <PlayIcon className="h-5 w-5" />
      )}
      <span>{isIOS ? "App Store" : "Google Play"}</span>
    </motion.button>
  );
}
