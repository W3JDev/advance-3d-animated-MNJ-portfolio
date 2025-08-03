import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function AmbientSVGBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        width="100%"
        height="100%"
        className="absolute inset-0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Radial gradients for jewel effects */}
          <radialGradient id="amethyst" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(139, 92, 246, 0.3)" />
            <stop offset="50%" stopColor="rgba(139, 92, 246, 0.1)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          <radialGradient id="sapphire" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)" />
            <stop offset="50%" stopColor="rgba(59, 130, 246, 0.1)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          <radialGradient id="emerald" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(16, 185, 129, 0.3)" />
            <stop offset="50%" stopColor="rgba(16, 185, 129, 0.1)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          <radialGradient id="ruby" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(236, 72, 153, 0.3)" />
            <stop offset="50%" stopColor="rgba(236, 72, 153, 0.1)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          {/* Animated gradient for mouse following */}
          <radialGradient id="mouseGlow" cx={`${mousePosition.x}%`} cy={`${mousePosition.y}%`} r="20%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.1)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          {/* Dot pattern */}
          <pattern id="dotMatrix" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="1" fill="rgba(255, 255, 255, 0.1)" />
          </pattern>

          {/* Shimmer pattern */}
          <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="rgba(255, 255, 255, 0.1)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>

        {/* Base dot matrix */}
        <rect width="100%" height="100%" fill="url(#dotMatrix)" opacity="0.3" />

        {/* Mouse following glow */}
        <rect width="100%" height="100%" fill="url(#mouseGlow)" />

        {/* Animated jewel orbs */}
        <motion.circle
          cx="20%"
          cy="30%"
          r="150"
          fill="url(#amethyst)"
          animate={{
            cx: ['20%', '25%', '20%'],
            cy: ['30%', '35%', '30%'],
            r: [150, 180, 150],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <motion.circle
          cx="80%"
          cy="20%"
          r="120"
          fill="url(#sapphire)"
          animate={{
            cx: ['80%', '75%', '80%'],
            cy: ['20%', '25%', '20%'],
            r: [120, 150, 120],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />

        <motion.circle
          cx="30%"
          cy="80%"
          r="100"
          fill="url(#emerald)"
          animate={{
            cx: ['30%', '35%', '30%'],
            cy: ['80%', '75%', '80%'],
            r: [100, 130, 100],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 4,
          }}
        />

        <motion.circle
          cx="70%"
          cy="70%"
          r="80"
          fill="url(#ruby)"
          animate={{
            cx: ['70%', '75%', '70%'],
            cy: ['70%', '65%', '70%'],
            r: [80, 110, 80],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />

        {/* Flowing energy lines */}
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.path
            key={`energy-${i}`}
            d={`M ${10 + i * 20} 0 Q ${50 + i * 15} ${50 + i * 10} ${90 - i * 10} 100`}
            stroke="url(#shimmer)"
            strokeWidth="1"
            fill="none"
            opacity="0.3"
            animate={{
              pathLength: [0, 1, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
          />
        ))}

        {/* Geometric constellation */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const radius = 30 + Math.sin(i) * 10;
          const x = 50 + Math.cos(angle) * radius;
          const y = 50 + Math.sin(angle) * radius;

          return (
            <motion.circle
              key={`star-${i}`}
              cx={`${x}%`}
              cy={`${y}%`}
              r="2"
              fill="rgba(255, 255, 255, 0.4)"
              animate={{
                opacity: [0.2, 1, 0.2],
                r: [1, 3, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.2,
              }}
            />
          );
        })}

        {/* Neural network connections */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.line
            key={`connection-${i}`}
            x1={`${20 + i * 10}%`}
            y1={`${30 + i * 5}%`}
            x2={`${60 + i * 5}%`}
            y2={`${50 + i * 3}%`}
            stroke="rgba(139, 92, 246, 0.2)"
            strokeWidth="1"
            animate={{
              opacity: [0, 0.6, 0],
              strokeWidth: [0.5, 2, 0.5],
            }}
            transition={{
              duration: 2 + i * 0.3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.4,
            }}
          />
        ))}

        {/* Shimmer overlay */}
        <motion.rect
          width="100%"
          height="100%"
          fill="url(#shimmer)"
          opacity="0.1"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
            repeatDelay: 4,
          }}
        />
      </svg>
    </div>
  );
}