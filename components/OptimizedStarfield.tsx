import { motion } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';

export function OptimizedStarfield() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 0.5,
        y: (e.clientY / window.innerHeight - 0.5) * 0.5,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Generate optimized star data - much fewer stars for better performance
  const stars = useMemo(() => 
    Array.from({ length: 300 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.5 + 0.5, // Smaller, more realistic sizes
      opacity: Math.random() * 0.6 + 0.4,
      twinkleSpeed: Math.random() * 3 + 2, // Independent timing for each star
      delay: Math.random() * 4, // Stagger the animations
    })), []
  );

  // Fewer, larger background stars for depth
  const backgroundStars = useMemo(() =>
    Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.3 + 0.1,
      moveSpeed: Math.random() * 0.3 + 0.1,
    })), []
  );

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
      {/* Simple dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-black to-gray-900" />
      
      {/* Subtle atmospheric glow - much lighter than before */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(circle at 50% 30%, rgba(255, 255, 255, 0.03) 0%, transparent 60%)',
        }}
      />

      {/* Background stars layer - slow movement */}
      <motion.div
        className="absolute inset-0"
        animate={{
          x: mousePosition.x * 10,
          y: mousePosition.y * 10,
        }}
        transition={{ type: 'spring', stiffness: 50, damping: 30 }}
      >
        {backgroundStars.map((star) => (
          <motion.div
            key={`bg-${star.id}`}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              willChange: 'opacity',
            }}
            animate={{
              opacity: [star.opacity * 0.5, star.opacity, star.opacity * 0.5],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: star.id * 0.1,
            }}
          />
        ))}
      </motion.div>

      {/* Main starfield layer */}
      <motion.div
        className="absolute inset-0"
        animate={{
          x: mousePosition.x * 20,
          y: mousePosition.y * 20,
        }}
        transition={{ type: 'spring', stiffness: 100, damping: 25 }}
      >
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              willChange: 'opacity, transform',
              boxShadow: star.size > 1 ? '0 0 2px rgba(255, 255, 255, 0.3)' : 'none',
            }}
            animate={{
              opacity: [
                star.opacity * 0.3,
                star.opacity,
                star.opacity * 0.7,
                star.opacity,
                star.opacity * 0.3,
              ],
              scale: [0.8, 1, 1.2, 1, 0.8],
            }}
            transition={{
              duration: star.twinkleSpeed,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: star.delay,
            }}
          />
        ))}
      </motion.div>

      {/* Minimal floating particles for atmosphere */}
      {Array.from({ length: 12 }, (_, i) => {
        const size = Math.random() * 3 + 1;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        return (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full bg-white/10"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              width: `${size}px`,
              height: `${size}px`,
              willChange: 'transform, opacity',
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.random() * 30 - 15, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 12 + Math.random() * 8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 6,
            }}
          />
        );
      })}

      {/* Subtle nebula effect - very light */}
      <motion.div
        className="absolute inset-0 opacity-5"
        animate={{
          background: [
            'radial-gradient(circle at 20% 40%, rgba(255, 255, 255, 0.02) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 60%, rgba(255, 255, 255, 0.02) 0%, transparent 50%)',
            'radial-gradient(circle at 40% 20%, rgba(255, 255, 255, 0.02) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 40%, rgba(255, 255, 255, 0.02) 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}