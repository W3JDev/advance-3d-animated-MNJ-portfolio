import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface SkillOrbProps {
  skill: {
    name: string;
    icon: LucideIcon;
    level: number;
    color: string;
  };
  index: number;
}

export function SkillOrb({ skill, index }: SkillOrbProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100, rotateX: -90 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ 
        duration: 1.2, 
        delay: index * 0.2,
        type: "spring",
        stiffness: 100 
      }}
      viewport={{ once: true }}
      whileHover={{ 
        scale: 1.1, 
        rotateY: 15,
        rotateX: 10,
        z: 50 
      }}
      className="relative group perspective-1000"
    >
      <div className="relative w-48 h-48 mx-auto">
        {/* Outer rotating ring */}
        <motion.div
          className={`absolute inset-0 rounded-full bg-gradient-to-r ${skill.color} opacity-20`}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Middle glow ring */}
        <motion.div
          className={`absolute inset-2 rounded-full bg-gradient-to-r ${skill.color} opacity-40 blur-sm`}
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Inner core */}
        <div className="absolute inset-6 bg-black/90 rounded-full flex flex-col items-center justify-center backdrop-blur-lg border border-white/10">
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotateY: [0, 180, 360] 
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className={`w-16 h-16 rounded-full bg-gradient-to-r ${skill.color} flex items-center justify-center mb-3`}
          >
            <skill.icon className="h-8 w-8 text-white" />
          </motion.div>
          
          <motion.h3 
            className="text-white text-sm text-center font-medium mb-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {skill.name}
          </motion.h3>
          
          {/* Skill level indicator */}
          <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              transition={{ duration: 2, delay: 0.8 }}
            />
          </div>
          
          <motion.span 
            className="text-gray-400 text-xs mt-1"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {skill.level}%
          </motion.span>
        </div>
        
        {/* Floating particles around orb */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 bg-gradient-to-r ${skill.color} rounded-full`}
            style={{
              left: `${50 + 30 * Math.cos((i * Math.PI * 2) / 8)}%`,
              top: `${50 + 30 * Math.sin((i * Math.PI * 2) / 8)}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}