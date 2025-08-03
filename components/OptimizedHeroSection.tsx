import { motion } from 'framer-motion';
import { Brain, Code, Sparkles, Palette, ArrowDown } from 'lucide-react';
import { PremiumHeading, PremiumText } from './PremiumTypography';

const skillTags = [
  { label: 'AI', icon: Brain },
  { label: 'Full-Stack', icon: Code },
  { label: 'Machine Learning', icon: Sparkles },
  { label: 'UI/UX', icon: Palette },
];

export function OptimizedHeroSection() {
  return (
    <div 
      className="relative min-h-screen w-full flex items-center justify-center p-6 overflow-hidden"
      style={{ zIndex: 2 }}
    >
      <div className="text-center max-w-4xl mx-auto relative">
        {/* Main title with elegant styling */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="mb-6"
        >
          <h1 
            className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4 text-white"
            style={{
              fontFamily: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
              textShadow: '0 0 20px rgba(255, 255, 255, 0.1)',
            }}
          >
            JEWEL
          </h1>
        </motion.div>

        {/* Professional subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mb-6"
        >
          <PremiumText 
            size="lg" 
            className="text-gray-300 font-light"
            style={{ fontSize: '1.125rem' }}
          >
            Self-Taught Full-Stack AI Application Developer
          </PremiumText>
        </motion.div>

        {/* Elegant tagline */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mb-12"
        >
          <p 
            className="uppercase tracking-widest text-gray-400"
            style={{ 
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
            }}
          >
            Crafted by Passion. Refined by Code.
          </p>
        </motion.div>

        {/* Optimized skill tags */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex flex-wrap gap-4 justify-center mb-16"
        >
          {skillTags.map((skill, index) => (
            <motion.div
              key={skill.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: 1.4 + index * 0.1,
                type: 'spring',
                stiffness: 300 
              }}
              whileHover={{ 
                y: -2,
                scale: 1.02,
              }}
              whileTap={{ scale: 0.98 }}
              className="group cursor-pointer"
            >
              <div
                className="px-5 py-3 rounded-full border border-white/20 text-gray-300 text-sm font-medium transition-all duration-300 ease-out flex items-center gap-2 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/30 hover:text-white"
                style={{
                  willChange: 'transform, background-color, border-color',
                }}
              >
                <skill.icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                {skill.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Clean call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-20"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 rounded-full text-white font-medium transition-all duration-300 bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/15 hover:border-white/30 relative overflow-hidden group"
            style={{ willChange: 'transform, background-color' }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 4 }}
            />
            <span className="relative z-10">Explore My Work</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 rounded-full font-medium transition-all duration-300 text-gray-300 border border-white/10 hover:border-white/20 hover:text-white bg-transparent hover:bg-white/5"
            style={{ willChange: 'transform, color, border-color' }}
          >
            Get In Touch
          </motion.button>
        </motion.div>

        {/* Minimal scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2 text-gray-400"
          >
            <div 
              className="w-6 h-10 border border-white/20 rounded-full relative overflow-hidden bg-white/5"
            >
              <motion.div
                className="w-1.5 h-2.5 bg-white/60 rounded-full mx-auto mt-2"
                animate={{ y: [0, 14, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
            <div className="text-xs tracking-wider uppercase flex items-center gap-1 opacity-60">
              <ArrowDown className="w-3 h-3" />
              Scroll
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}