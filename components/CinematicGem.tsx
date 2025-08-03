import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

export function CinematicGem() {
  const gemRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (gemRef.current) {
        const rect = gemRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        setMousePosition({
          x: (e.clientX - centerX) / rect.width,
          y: (e.clientY - centerY) / rect.height,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative w-80 h-80 mx-auto" ref={gemRef}>
      {/* Ambient glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, 
            rgba(139, 92, 246, 0.4) 0%, 
            rgba(236, 72, 153, 0.3) 30%, 
            rgba(16, 185, 129, 0.2) 60%, 
            transparent 80%
          )`,
          filter: 'blur(20px)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Main gem structure */}
      <motion.div
        className="relative w-full h-full"
        animate={{
          rotateY: [0, 360],
          rotateX: [0, 20, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${mousePosition.y * 10}deg) rotateY(${mousePosition.x * 10}deg)`,
        }}
      >
        {/* Gem facets */}
        {Array.from({ length: 8 }).map((_, i) => {
          const rotation = (i * 45);
          const gradients = [
            'from-purple-500 via-purple-400 to-purple-600', // Amethyst
            'from-blue-500 via-blue-400 to-blue-600',       // Sapphire
            'from-emerald-500 via-emerald-400 to-emerald-600', // Emerald
            'from-pink-500 via-pink-400 to-pink-600',       // Rose
            'from-indigo-500 via-indigo-400 to-indigo-600', // Tanzanite
            'from-cyan-500 via-cyan-400 to-cyan-600',       // Aquamarine
            'from-violet-500 via-violet-400 to-violet-600', // Amethyst variant
            'from-teal-500 via-teal-400 to-teal-600',       // Tourmaline
          ];

          return (
            <motion.div
              key={i}
              className={`absolute inset-4 bg-gradient-to-br ${gradients[i]} opacity-90`}
              style={{
                clipPath: `polygon(50% 0%, ${20 + i * 10}% ${30 + i * 5}%, ${80 - i * 10}% ${30 + i * 5}%)`,
                transform: `rotateZ(${rotation}deg) translateZ(${Math.sin(rotation * Math.PI / 180) * 20}px)`,
                transformOrigin: 'center center',
              }}
              animate={{
                opacity: [0.7, 1, 0.7],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.2,
              }}
            />
          );
        })}

        {/* Central core */}
        <motion.div
          className="absolute inset-8 rounded-full bg-gradient-to-br from-white/40 via-purple-200/30 to-pink-200/20 backdrop-blur-sm"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Sparkle effects */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute w-2 h-2 bg-white rounded-full"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Reflection layer */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-full"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </motion.div>

      {/* Floating particles around gem */}
      {Array.from({ length: 20 }).map((_, i) => {
        const radius = 180 + Math.random() * 80;
        const angle = (i / 20) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        return (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
            style={{
              left: '50%',
              top: '50%',
            }}
            animate={{
              x: [x, x * 1.2, x],
              y: [y, y * 1.2, y],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.1,
            }}
          />
        );
      })}
    </div>
  );
}