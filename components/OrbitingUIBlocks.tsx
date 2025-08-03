import { motion } from 'framer-motion';
import { Brain, Database, Code, Palette } from 'lucide-react';

interface UIBlock {
  id: string;
  label: string;
  icon: React.ReactNode;
  gradient: string;
  description: string;
}

export function OrbitingUIBlocks() {
  const blocks: UIBlock[] = [
    {
      id: 'ai',
      label: 'AI',
      icon: <Brain className="w-6 h-6" />,
      gradient: 'from-purple-500 to-pink-500',
      description: 'Machine Learning & Neural Networks',
    },
    {
      id: 'blockchain',
      label: 'BLOCKCHAIN',
      icon: <Database className="w-6 h-6" />,
      gradient: 'from-blue-500 to-cyan-500',
      description: 'Decentralized Solutions & Smart Contracts',
    },
    {
      id: 'fullstack',
      label: 'FULL-STACK',
      icon: <Code className="w-6 h-6" />,
      gradient: 'from-emerald-500 to-teal-500',
      description: 'End-to-End Development & Architecture',
    },
    {
      id: 'design',
      label: 'DESIGN',
      icon: <Palette className="w-6 h-6" />,
      gradient: 'from-orange-500 to-red-500',
      description: 'Creative Technology & Digital Art',
    },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none">
      {blocks.map((block, index) => {
        const angle = (index / blocks.length) * Math.PI * 2;
        const radius = 280;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        return (
          <motion.div
            key={block.id}
            className="absolute pointer-events-auto"
            style={{
              left: '50%',
              top: '50%',
            }}
            animate={{
              x: [x, Math.cos(angle + Math.PI * 2) * radius],
              y: [y, Math.sin(angle + Math.PI * 2) * radius],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: 'linear',
              delay: index * 0.5,
            }}
          >
            <motion.div
              className="relative group cursor-pointer"
              whileHover={{ scale: 1.1, y: -10 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.3, duration: 0.8, type: 'spring' }}
            >
              {/* Glow effect */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-r ${block.gradient} rounded-2xl blur-lg opacity-50`}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: index * 0.5,
                }}
              />

              {/* Main block */}
              <div className="relative bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl p-6 min-w-[140px] text-center">
                {/* Icon */}
                <motion.div
                  className={`w-12 h-12 mx-auto mb-3 bg-gradient-to-r ${block.gradient} rounded-xl flex items-center justify-center text-white shadow-lg`}
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  {block.icon}
                </motion.div>

                {/* Label */}
                <motion.h3
                  className={`text-sm font-bold bg-gradient-to-r ${block.gradient} bg-clip-text text-transparent mb-2 tracking-wider`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.3 + 0.5 }}
                >
                  {block.label}
                </motion.h3>

                {/* Description on hover */}
                <motion.div
                  className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-sm border border-white/10 rounded-lg p-3 text-xs text-gray-300 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
                  initial={{ y: 10, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                >
                  {block.description}
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black/80 border-l border-t border-white/10 rotate-45" />
                </motion.div>

                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-2xl"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    repeatDelay: 3 + index,
                  }}
                />
              </div>

              {/* Orbiting micro-particles */}
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.div
                  key={`micro-${i}`}
                  className={`absolute w-1 h-1 bg-gradient-to-r ${block.gradient} rounded-full`}
                  animate={{
                    rotate: [0, 360],
                  }}
                  style={{
                    transformOrigin: `${20 + i * 15}px 0px`,
                  }}
                  transition={{
                    duration: 3 + i,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}