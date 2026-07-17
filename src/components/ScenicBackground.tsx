"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface ScenicBackgroundProps {
  src: string;
  alt?: string;
  fallbackSrc?: string;
  children?: React.ReactNode;
  overlay?: boolean;
  overlayColor?: string;
  className?: string;
  priority?: boolean;
  vignette?: boolean;
}

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1590523278191-995cbcda646b?w=1600&q=85";

export default function ScenicBackground({
  src,
  alt = "",
  fallbackSrc = FALLBACK_IMAGE,
  children,
  overlay = true,
  overlayColor = "from-[#0b0b0b]/50 via-[#0b0b0b]/20 to-[#0b0b0b]/60",
  className = "",
  priority = false,
  vignette = true,
}: ScenicBackgroundProps) {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, prefersReduced ? 1 : 1.15]);
  const y = useTransform(scrollYProgress, [0, 1], [0, prefersReduced ? 0 : 60]);

  const currentSrc = imgError ? fallbackSrc : src;

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-[#0b0b0b] ${className}`}
    >
      {/* Background image with Ken Burns zoom */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ scale, y }}
      >
        <img
          key={currentSrc}
          src={currentSrc}
          alt={alt}
          className={`h-full w-full object-cover transition-opacity duration-700 ${
            imgLoaded ? "opacity-100" : "opacity-0"
          }`}
          loading={priority ? "eager" : "lazy"}
          onLoad={() => setImgLoaded(true)}
          onError={() => {
            if (!imgError) setImgError(true);
          }}
        />
      </motion.div>

      {/* Dark vignette overlay — semi-transparent so the image stays visible */}
      {overlay && (
        <div
          className={`absolute inset-0 bg-gradient-to-b ${overlayColor}`}
        />
      )}

      {/* Additional vignette for edges */}
      {vignette && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0b0b]/30 via-transparent to-[#0b0b0b]/30 pointer-events-none" />
      )}

      {/* Content layer */}
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  );
}