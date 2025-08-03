import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function LuxuryBackground() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Reduced and refined floating elements - only 6 elegant shapes
  const floatingElements = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    x: 15 + (i * 15) + Math.random() * 10, // More organized positioning
    y: 20 + Math.random() * 60,
    size: 60 + Math.random() * 40,
    rotation: Math.random() * 45,
    delay: i * 2, // Staggered timing
    type: ['diamond', 'square', 'circle'][i % 3],
  }));

  // Subtle ambient particles - much fewer
  const ambientParticles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 8,
  }));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Clean gradient foundation */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-black to-purple-950/30" />
      
      {/* Subtle animated gradient overlay - much calmer */}
      <motion.div
        className="absolute inset-0 opacity-15"
        animate={{
          background: [
            'radial-gradient(circle at 30% 40%, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
            'radial-gradient(circle at 70% 60%, rgba(236, 72, 153, 0.08) 0%, transparent 70%)',
            'radial-gradient(circle at 50% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
            'radial-gradient(circle at 30% 40%, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
          ]
        }}
        transition={{
          duration: 35, // Much slower
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Refined floating elements - fewer, more elegant */}
      {floatingElements.map((element) => (
        <motion.div
          key={`element-${element.id}`}
          className="absolute opacity-20"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            width: element.size,
            height: element.size,
          }}
          initial={{ 
            rotate: element.rotation,
            scale: 0,
            opacity: 0 
          }}
          animate={{
            rotate: [element.rotation, element.rotation + 180, element.rotation + 360],
            scale: [0, 1, 0.95, 1],
            opacity: [0, 0.25, 0.15, 0.25],
            y: [-20, 20, -20],
            x: [-10, 10, -10],
          }}
          transition={{
            duration: 25 + element.delay, // Much slower rotation
            repeat: Infinity,
            ease: "easeInOut",
            delay: element.delay,
          }}
        >
          {/* Clean geometric shapes */}
          <div className="relative w-full h-full">
            {element.type === 'diamond' && (
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 via-blue-400/15 to-purple-500/10 transform rotate-45 rounded-lg backdrop-blur-sm border border-white/10" />
                <div className="absolute inset-4 bg-gradient-to-br from-white/5 to-transparent transform rotate-45 rounded-md" />
              </>
            )}
            {element.type === 'square' && (
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/15 via-purple-400/10 to-pink-400/15 rounded-xl backdrop-blur-sm border border-white/8" />
                <div className="absolute inset-3 bg-gradient-to-br from-white/8 to-transparent rounded-lg" />
              </>
            )}
            {element.type === 'circle' && (
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-pink-400/15 via-purple-400/10 to-blue-400/15 rounded-full backdrop-blur-sm border border-white/8" />
                <div className="absolute inset-2 bg-gradient-to-br from-white/8 to-transparent rounded-full" />
              </>
            )}
          </div>
        </motion.div>
      ))}

      {/* Subtle ambient particles - much fewer and calmer */}
      {ambientParticles.map((particle) => (
        <motion.div
          key={`particle-${particle.id}`}
          className="absolute w-1 h-1 bg-white/20 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            opacity: [0.2, 0.6, 0.2],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 4 + Math.random() * 4, // Gentler timing
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}

      {/* Refined light rays - only 3, very subtle */}
      <div className="absolute inset-0">
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={`ray-${i}`}
            className="absolute opacity-5"
            style={{
              left: `${30 + i * 20}%`,
              top: '-5%',
              width: '1px',
              height: '110%',
              background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.3), transparent)',
              transformOrigin: 'top center',
            }}
            animate={{
              rotate: [0, 1, -1, 0], // Very subtle movement
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: 15 + i * 5, // Very slow
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2,
            }}
          />
        ))}
      </div>

      {/* Premium border glow - single, elegant */}
      <div className="absolute inset-0 border border-white/5 pointer-events-none">
        <motion.div
          className="absolute inset-0 border border-purple-500/10 rounded-sm"
          animate={{
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Single subtle mesh overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
}