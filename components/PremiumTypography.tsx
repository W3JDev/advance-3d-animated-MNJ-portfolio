import React from 'react';
import { motion } from 'framer-motion';

interface PremiumHeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
  gradient?: string;
}

interface PremiumTextProps {
  children: React.ReactNode;
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';
  color?: 'primary' | 'secondary' | 'muted' | 'white';
  className?: string;
  style?: React.CSSProperties;
}

interface PremiumContainerProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
}

export function PremiumHeading({ level, children, className = '', gradient }: PremiumHeadingProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  
  const sizeClasses = {
    1: 'text-4xl md:text-5xl lg:text-6xl',
    2: 'text-3xl md:text-4xl lg:text-5xl',
    3: 'text-2xl md:text-3xl lg:text-4xl',
    4: 'text-xl md:text-2xl lg:text-3xl',
    5: 'text-lg md:text-xl lg:text-2xl',
    6: 'text-base md:text-lg lg:text-xl'
  };

  // Improved gradient handling with solid color fallback
  const gradientClasses = gradient 
    ? `text-white bg-gradient-to-r ${gradient} bg-clip-text hover:text-transparent transition-all duration-300`
    : 'text-white';

  return (
    <Tag 
      className={`font-bold leading-tight tracking-tight ${sizeClasses[level]} ${gradientClasses} ${className}`}
      style={{
        // Ensure text is always visible with fallback
        color: gradient ? '#ffffff' : undefined,
        WebkitTextFillColor: gradient ? 'transparent' : undefined,
        backgroundClip: gradient ? 'text' : undefined,
        WebkitBackgroundClip: gradient ? 'text' : undefined,
      }}
    >
      {children}
    </Tag>
  );
}

export function PremiumText({ children, size = 'base', color = 'primary', className = '', style }: PremiumTextProps) {
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl'
  };

  const colorClasses = {
    primary: 'text-white',
    secondary: 'text-gray-300',
    muted: 'text-gray-400',
    white: 'text-white'
  };

  return (
    <p className={`${sizeClasses[size]} ${colorClasses[color]} ${className}`} style={style}>
      {children}
    </p>
  );
}

export function PremiumContainer({ children, size = 'lg', className = '' }: PremiumContainerProps) {
  const sizeClasses = {
    sm: 'max-w-3xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full'
  };

  return (
    <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${sizeClasses[size]} ${className}`}>
      {children}
    </div>
  );
}