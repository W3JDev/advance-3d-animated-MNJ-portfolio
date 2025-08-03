import { motion } from 'framer-motion';
import { Brain, Code, Database, Palette } from 'lucide-react';

export function MinimalHeroCenter() {
  const skills = [
    { icon: Brain, label: 'AI', color: 'text-purple-400' },
    { icon: Code, label: 'Full-Stack', color: 'text-emerald-400' },
    { icon: Database, label: 'Blockchain', color: 'text-blue-400' },
    { icon: Palette, label: 'Design', color: 'text-pink-400' },
  ];

  return (
    <div className="relative flex items-center justify-center">
      {/* Central focus point */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {/* Main content circle */}
        <motion.div
          className="w-32 h-32 rounded-full bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-lg border border-white/20 flex items-center justify-center relative overflow-hidden"
          animate={{
            boxShadow: [
              '0 0 20px rgba(255, 255, 255, 0.1)',
              '0 0 40px rgba(139, 92, 246, 0.3)',
              '0 0 20px rgba(255, 255, 255, 0.1)',
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {/* Inner glow */}
          <motion.div
            className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400/30 via-blue-400/20 to-pink-400/30"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.6, 0.9, 0.6],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
              repeatDelay: 3,
            }}
          />
        </motion.div>
      </motion.div>

      {/* Floating skill indicators */}
      {skills.map((skill, index) => {
        const angle = (index / skills.length) * Math.PI * 2;
        const radius = 120;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        return (
          <motion.div
            key={skill.label}
            className="absolute"
            style={{
              left: '50%',
              top: '50%',
            }}
            initial={{ opacity: 0, scale: 0, x, y }}
            animate={{ opacity: 1, scale: 1, x, y }}
            transition={{
              duration: 0.8,
              delay: 1 + index * 0.2,
              type: 'spring',
              stiffness: 200,
            }}
          >
            <motion.div
              className="w-14 h-14 rounded-xl bg-black/40 backdrop-blur-xl border border-white/20 flex items-center justify-center group cursor-pointer"
              whileHover={{ 
                scale: 1.1, 
                y: -5,
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
              }}
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                y: {
                  duration: 3 + index * 0.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: index * 0.5,
                },
              }}
            >
              <skill.icon className={`w-6 h-6 ${skill.color}`} />
              
              {/* Tooltip */}
              <motion.div
                className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-1 text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                initial={{ y: 5 }}
                whileHover={{ y: 0 }}
              >
                {skill.label}
              </motion.div>
            </motion.div>
          </motion.div>
        );
      })}

      {/* Subtle particle effects */}
      {Array.from({ length: 12 }).map((_, i) => {
        const radius = 160 + Math.random() * 40;
        const angle = (i / 12) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        return (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-white/40 rounded-full"
            style={{
              left: '50%',
              top: '50%',
            }}
            animate={{
              x: [x, x * 1.2, x],
              y: [y, y * 1.2, y],
              opacity: [0.2, 0.6, 0.2],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.2,
            }}
          />
        );
      })}
    </div>
  );
}