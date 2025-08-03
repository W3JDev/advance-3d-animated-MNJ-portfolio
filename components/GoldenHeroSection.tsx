import { motion } from 'framer-motion';
import { Brain, Code, Sparkles, Palette, ArrowDown } from 'lucide-react';
import { PremiumHeading, PremiumText } from './PremiumTypography';

const skillTags = [
  { label: 'AI', icon: Brain },
  { label: 'Full-Stack', icon: Code },
  { label: 'Machine Learning', icon: Sparkles },
  { label: 'UI/UX', icon: Palette },
];

export function GoldenHeroSection() {
  return (
    <div 
      className="relative min-h-screen w-full flex items-center justify-center p-4 overflow-hidden"
      style={{ zIndex: 2 }}
    >
      <div className="text-center max-w-4xl mx-auto relative">
        {/* Main title with golden glow */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.5, type: 'spring' }}
          className="mb-8"
        >
          <h1 
            className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4"
            style={{
              fontFamily: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
              color: '#f0f0f0',
              textShadow: `
                0 0 8px rgba(255, 223, 186, 0.4),
                0 0 12px rgba(255, 190, 100, 0.3),
                0 0 20px rgba(255, 215, 0, 0.2)
              `,
            }}
          >
            JEWEL
          </h1>
        </motion.div>

        {/* Professional subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1 }}
          className="mb-8"
        >
          <PremiumText 
            size="lg" 
            className="text-gray-300 font-light mb-2"
            style={{ fontSize: '1.125rem' }}
          >
            Self-Taught Full-Stack AI Application Developer
          </PremiumText>
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mb-12"
        >
          <p 
            className="uppercase tracking-widest"
            style={{ 
              fontFamily: 'ui-sans-serif, system-ui, sans-serif',
              fontSize: '0.8rem',
              color: '#c0a080',
              letterSpacing: '0.2em',
            }}
          >
            Crafted by Passion. Refined by Code.
          </p>
        </motion.div>

        {/* Skill tags */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
          className="flex flex-wrap gap-4 justify-center mb-16"
        >
          {skillTags.map((skill, index) => (
            <motion.div
              key={skill.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: 2.2 + index * 0.1,
                type: 'spring',
                stiffness: 200 
              }}
              whileHover={{ 
                y: -2,
                scale: 1.05,
                boxShadow: '0 0 15px rgba(224, 192, 160, 0.3)',
              }}
              whileTap={{ scale: 0.98 }}
              className="group cursor-pointer"
            >
              <div
                className="px-5 py-3 rounded-full border transition-all duration-300 ease-out flex items-center gap-2"
                style={{
                  borderColor: 'rgba(192, 160, 128, 0.5)',
                  color: '#e0c0a0',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                }}
                onMouseEnter={(e) => {
                  const target = e.currentTarget;
                  target.style.backgroundColor = 'rgba(192, 160, 128, 0.1)';
                  target.style.borderColor = 'rgba(224, 192, 160, 1)';
                }}
                onMouseLeave={(e) => {
                  const target = e.currentTarget;
                  target.style.backgroundColor = 'transparent';
                  target.style.borderColor = 'rgba(192, 160, 128, 0.5)';
                }}
              >
                <skill.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                {skill.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.8 }}
          className="flex flex-col sm:flex-row gap-6 items-center justify-center mb-16"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 rounded-full text-white font-medium transition-all duration-300 relative overflow-hidden group"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(218, 165, 32, 0.3))',
              border: '1px solid rgba(255, 215, 0, 0.3)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-transparent to-yellow-400/20"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            />
            <span className="relative z-10">Explore My Work</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 rounded-full font-medium transition-all duration-300"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#e0c0a0',
              backdropFilter: 'blur(10px)',
            }}
          >
            Get In Touch
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <div 
              className="w-6 h-10 border-2 rounded-full mx-auto relative overflow-hidden"
              style={{ 
                borderColor: 'rgba(192, 160, 128, 0.4)',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
              }}
            >
              <motion.div
                className="w-1.5 h-2.5 rounded-full mx-auto mt-2"
                style={{ backgroundColor: '#c0a080' }}
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <div 
              className="text-xs tracking-wider uppercase flex items-center gap-2"
              style={{ color: '#c0a080' }}
            >
              <ArrowDown className="w-3 h-3" />
              Scroll
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}