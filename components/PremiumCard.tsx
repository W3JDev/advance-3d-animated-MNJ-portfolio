import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PremiumCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'glass' | 'solid' | 'gradient' | 'minimal';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
  gradient?: string;
}

export function PremiumCard({ 
  children, 
  className = '', 
  variant = 'glass',
  padding = 'lg',
  hover = true,
  gradient = 'from-white/10 to-white/5'
}: PremiumCardProps) {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-12'
  };

  const variantClasses = {
    glass: `bg-gradient-to-br ${gradient} backdrop-blur-xl border border-white/10`,
    solid: 'bg-gray-900/80 border border-gray-800',
    gradient: `bg-gradient-to-br ${gradient} border border-white/20`,
    minimal: 'bg-transparent border border-white/5'
  };

  const hoverProps = hover ? {
    whileHover: { 
      y: -8, 
      scale: 1.02,
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  } : {};

  return (
    <motion.div
      className={`
        ${variantClasses[variant]}
        ${paddingClasses[padding]}
        rounded-2xl
        relative overflow-hidden
        group
        ${className}
      `}
      {...hoverProps}
    >
      {/* Subtle inner glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Premium shine effect - simplified */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent w-32 -translate-x-full"
        animate={{
          translateX: hover ? ['0%', '200%'] : '0%'
        }}
        transition={{ 
          duration: 1.5,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatDelay: 3
        }}
      />
    </motion.div>
  );
}

interface PremiumGlassCardProps {
  children: ReactNode;
  className?: string;
  blur?: 'sm' | 'md' | 'lg' | 'xl';
  opacity?: number;
}

export function PremiumGlassCard({ 
  children, 
  className = '',
  blur = 'xl',
  opacity = 0.1
}: PremiumGlassCardProps) {
  const blurClasses = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
    xl: 'backdrop-blur-xl'
  };

  return (
    <motion.div
      className={`
        bg-white/10 ${blurClasses[blur]}
        border border-white/20
        rounded-3xl p-8
        relative overflow-hidden
        group
        ${className}
      `}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
    >
      {/* Multi-layer glass effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent" />
      <div className="absolute inset-1 bg-gradient-to-br from-white/5 via-transparent to-white/5 rounded-3xl" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Corner accents */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/10 to-transparent" />
      <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-white/10 to-transparent" />
    </motion.div>
  );
}