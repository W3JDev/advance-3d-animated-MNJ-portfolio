import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface TechIcon {
  name: string;
  icon: string;
  color: string;
}

interface SkillOrb {
  id: string;
  category: string;
  gradient: string;
  position: { x: number; y: number };
  techs: TechIcon[];
}

export function SkillOrbs() {
  const [hoveredOrb, setHoveredOrb] = useState<string | null>(null);

  const skillOrbs: SkillOrb[] = [
    {
      id: 'frontend',
      category: 'Frontend',
      gradient: 'from-blue-500 to-cyan-500',
      position: { x: 15, y: 20 },
      techs: [
        { name: 'React', icon: '⚛️', color: 'text-blue-400' },
        { name: 'Vue.js', icon: '🟢', color: 'text-green-400' },
        { name: 'TypeScript', icon: '🔷', color: 'text-blue-500' },
        { name: 'Next.js', icon: '▲', color: 'text-white' },
      ],
    },
    {
      id: 'backend',
      category: 'Backend',
      gradient: 'from-emerald-500 to-teal-500',
      position: { x: 80, y: 25 },
      techs: [
        { name: 'Node.js', icon: '🟩', color: 'text-green-500' },
        { name: 'Python', icon: '🐍', color: 'text-yellow-400' },
        { name: 'PostgreSQL', icon: '🐘', color: 'text-blue-600' },
        { name: 'Redis', icon: '🔴', color: 'text-red-500' },
      ],
    },
    {
      id: 'ai',
      category: 'AI/ML',
      gradient: 'from-purple-500 to-pink-500',
      position: { x: 25, y: 70 },
      techs: [
        { name: 'TensorFlow', icon: '🧠', color: 'text-orange-400' },
        { name: 'PyTorch', icon: '🔥', color: 'text-red-400' },
        { name: 'OpenAI', icon: '🤖', color: 'text-green-400' },
        { name: 'Hugging Face', icon: '🤗', color: 'text-yellow-400' },
      ],
    },
    {
      id: 'blockchain',
      category: 'Blockchain',
      gradient: 'from-orange-500 to-red-500',
      position: { x: 75, y: 75 },
      techs: [
        { name: 'Solidity', icon: '⟠', color: 'text-gray-300' },
        { name: 'Web3.js', icon: '🕸️', color: 'text-blue-300' },
        { name: 'IPFS', icon: '🌐', color: 'text-cyan-300' },
        { name: 'Ethereum', icon: '💎', color: 'text-purple-300' },
      ],
    },
    {
      id: 'cloud',
      category: 'Cloud',
      gradient: 'from-indigo-500 to-purple-500',
      position: { x: 50, y: 15 },
      techs: [
        { name: 'AWS', icon: '☁️', color: 'text-orange-400' },
        { name: 'Docker', icon: '🐳', color: 'text-blue-400' },
        { name: 'Kubernetes', icon: '⚙️', color: 'text-blue-600' },
        { name: 'Vercel', icon: '▲', color: 'text-white' },
      ],
    },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none">
      {skillOrbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute pointer-events-auto"
          style={{
            left: `${orb.position.x}%`,
            top: `${orb.position.y}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: orb.position.x / 20, duration: 0.8 }}
        >
          <motion.div
            className="relative cursor-pointer"
            onHoverStart={() => setHoveredOrb(orb.id)}
            onHoverEnd={() => setHoveredOrb(null)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Main orb */}
            <motion.div
              className={`w-16 h-16 rounded-full bg-gradient-to-r ${orb.gradient} shadow-lg relative overflow-hidden`}
              animate={{
                boxShadow: hoveredOrb === orb.id 
                  ? ['0 0 20px rgba(139, 92, 246, 0.5)', '0 0 40px rgba(139, 92, 246, 0.8)', '0 0 20px rgba(139, 92, 246, 0.5)']
                  : '0 0 20px rgba(0, 0, 0, 0.3)',
              }}
              transition={{ duration: 1, repeat: hoveredOrb === orb.id ? Infinity : 0 }}
            >
              {/* Pulsing core */}
              <motion.div
                className="absolute inset-2 rounded-full bg-white/20 backdrop-blur-sm"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              {/* Category label */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold"
                animate={{
                  opacity: hoveredOrb === orb.id ? 0 : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                {orb.category.slice(0, 2)}
              </motion.div>

              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full"
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

            {/* Expanded tech icons */}
            <AnimatePresence>
              {hoveredOrb === orb.id && (
                <motion.div
                  className="absolute -inset-20 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {orb.techs.map((tech, index) => {
                    const angle = (index / orb.techs.length) * Math.PI * 2;
                    const radius = 60;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;

                    return (
                      <motion.div
                        key={tech.name}
                        className="absolute"
                        style={{
                          left: '50%',
                          top: '50%',
                        }}
                        initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                        animate={{ x, y, opacity: 1, scale: 1 }}
                        exit={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: index * 0.1,
                          type: 'spring',
                          stiffness: 300,
                          damping: 20,
                        }}
                      >
                        <motion.div
                          className="relative group"
                          whileHover={{ scale: 1.2, y: -2 }}
                        >
                          {/* Tech icon */}
                          <div className={`w-10 h-10 rounded-lg bg-black/80 backdrop-blur-sm border border-white/20 flex items-center justify-center text-lg ${tech.color} shadow-lg`}>
                            {tech.icon}
                          </div>

                          {/* Tooltip */}
                          <motion.div
                            className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/90 backdrop-blur-sm border border-white/10 rounded px-2 py-1 text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
                            initial={{ y: 5 }}
                            whileHover={{ y: 0 }}
                          >
                            {tech.name}
                          </motion.div>

                          {/* Connecting line */}
                          <motion.div
                            className="absolute inset-0 border border-white/10"
                            style={{
                              width: '1px',
                              height: `${radius}px`,
                              left: '50%',
                              transformOrigin: 'bottom center',
                              transform: `rotate(${angle + Math.PI/2}rad)`,
                            }}
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{ delay: index * 0.05, duration: 0.3 }}
                          />
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Hover glow */}
            <motion.div
              className={`absolute inset-0 rounded-full bg-gradient-to-r ${orb.gradient} blur-xl opacity-0`}
              animate={{
                opacity: hoveredOrb === orb.id ? 0.6 : 0,
                scale: hoveredOrb === orb.id ? 1.5 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}