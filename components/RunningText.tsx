import { motion } from 'framer-motion';

interface RunningTextProps {
  text: string;
  direction?: 'left' | 'right';
  speed?: number;
  className?: string;
}

export function RunningText({ text, direction = 'left', speed = 80, className = '' }: RunningTextProps) {
  const duplicatedText = Array(8).fill(text).join(' • '); // Fewer duplications for cleaner look
  
  return (
    <div className={`overflow-hidden whitespace-nowrap relative py-8 ${className}`}>
      {/* Refined background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-white/5 to-black/20" />
      
      {/* Main text with premium styling */}
      <motion.div
        className="inline-block relative z-10"
        animate={{
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%']
        }}
        transition={{
          duration: speed, // Now much slower (80 vs 25)
          repeat: Infinity,
          ease: 'linear'
        }}
      >
        <span className="inline-block pr-20 text-xl md:text-2xl lg:text-3xl font-light tracking-[0.2em]">
          <span 
            className="bg-gradient-to-r from-gray-300 via-white to-gray-300 bg-clip-text text-transparent"
            style={{
              fontVariantCaps: 'small-caps',
              letterSpacing: '0.15em'
            }}
          >
            {duplicatedText}
          </span>
        </span>
      </motion.div>
      
      {/* Subtle shine effect - much slower and fixed width */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent w-40 blur-md"
        animate={{
          x: [-250, '100vw'] // Use viewport width instead of dimensions
        }}
        transition={{
          duration: 8, // Much slower shine
          repeat: Infinity,
          ease: 'easeInOut',
          repeatDelay: 4
        }}
      />
      
      {/* Refined edge fade */}
      <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-black to-transparent z-20" />
      <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-black to-transparent z-20" />
    </div>
  );
}