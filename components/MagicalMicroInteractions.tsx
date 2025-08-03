import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// Enhanced Magnetic Button with Ripple Effect
interface MagicalButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export function MagicalButton({ 
  children, 
  className = '', 
  onClick, 
  variant = 'primary',
  size = 'md' 
}: MagicalButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);
  
  const springConfig = { damping: 15, stiffness: 300 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set((event.clientX - centerX) / 5);
    y.set((event.clientY - centerY) / 5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const rippleX = event.clientX - rect.left;
    const rippleY = event.clientY - rect.top;
    
    const newRipple = {
      id: Date.now(),
      x: rippleX,
      y: rippleY
    };
    
    setRipples(prev => [...prev, newRipple]);
    
    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
    
    onClick?.();
  };

  const variants = {
    primary: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25',
    secondary: 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/25',
    ghost: 'bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <motion.button
      ref={ref}
      className={`
        relative overflow-hidden rounded-full font-medium transition-all duration-300
        transform-gpu perspective-1000 preserve-3d
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d'
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      whileHover={{ 
        scale: 1.05,
        boxShadow: variant === 'primary' 
          ? '0 20px 40px rgba(147, 51, 234, 0.4)' 
          : '0 20px 40px rgba(6, 182, 212, 0.4)'
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      {/* Shimmer Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: '-100%' }}
        animate={isHovered ? { x: '100%' } : { x: '-100%' }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      />
      
      {/* Ripple Effects */}
      {ripples.map(ripple => (
        <motion.div
          key={ripple.id}
          className="absolute bg-white/30 rounded-full pointer-events-none"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      ))}
      
      {/* Content */}
      <span className="relative z-10">{children}</span>
      
      {/* Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-0"
        style={{
          background: variant === 'primary' 
            ? 'radial-gradient(circle, rgba(147, 51, 234, 0.6) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(6, 182, 212, 0.6) 0%, transparent 70%)'
        }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
}

// Enhanced Card with Tilt and Glow
interface MagicalCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export function MagicalCard({ 
  children, 
  className = '',
  glowColor = 'purple' 
}: MagicalCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-300, 300], [15, -15]);
  const rotateY = useTransform(x, [-300, 300], [-15, 15]);
  
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set((event.clientX - centerX) / 10);
    y.set((event.clientY - centerY) / 10);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const glowColors = {
    purple: 'shadow-purple-500/25',
    cyan: 'shadow-cyan-500/25',
    pink: 'shadow-pink-500/25',
    blue: 'shadow-blue-500/25'
  };

  return (
    <motion.div
      ref={ref}
      className={`
        relative transform-gpu perspective-1000 preserve-3d
        bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl
        transition-all duration-300
        ${className}
      `}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d'
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={{ 
        scale: 1.02,
        boxShadow: `0 25px 50px ${glowColors[glowColor as keyof typeof glowColors] || glowColors.purple}`
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Animated Border */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0"
        style={{
          background: `linear-gradient(45deg, transparent, ${glowColor === 'purple' ? '#8b5cf6' : '#06b6d4'}/20, transparent)`
        }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Spotlight Effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${x.get() + 50}% ${y.get() + 50}%, rgba(255,255,255,0.1) 0%, transparent 50%)`
        }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

// Floating Action Button with Pulse
interface FloatingActionButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function FloatingActionButton({ 
  icon, 
  onClick, 
  className = '' 
}: FloatingActionButtonProps) {
  return (
    <motion.button
      className={`
        fixed bottom-8 right-8 z-50
        w-14 h-14 rounded-full
        bg-gradient-to-r from-purple-600 to-pink-600
        text-white shadow-lg shadow-purple-500/25
        flex items-center justify-center
        ${className}
      `}
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      animate={{
        boxShadow: [
          '0 0 20px rgba(147, 51, 234, 0.3)',
          '0 0 40px rgba(147, 51, 234, 0.6)',
          '0 0 20px rgba(147, 51, 234, 0.3)'
        ]
      }}
      transition={{
        boxShadow: {
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }
      }}
    >
      {icon}
    </motion.button>
  );
}
