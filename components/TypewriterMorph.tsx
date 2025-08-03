import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export function TypewriterMorph() {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  const phases = [
    {
      text: 'Jewel. Full-Stack AI Architect.',
      style: 'text-3xl md:text-4xl text-white font-medium tracking-wide',
      duration: 3000,
    },
    {
      text: 'Modular Intelligence. Cinematic Design. Enterprise Precision.',
      style: 'text-2xl md:text-3xl bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent font-medium tracking-tight',
      duration: 4000,
    },
  ];

  useEffect(() => {
    let timeout: number;
    let interval: number;

    const typeText = (text: string, onComplete: () => void) => {
      let i = 0;
      setDisplayText('');
      setIsTyping(true);

      interval = window.setInterval(() => {
        if (i < text.length) {
          setDisplayText(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
          setIsTyping(false);
          timeout = window.setTimeout(onComplete, phases[currentPhase].duration);
        }
      }, 40 + Math.random() * 40); // More consistent typing speed
    };

    const eraseText = (onComplete: () => void) => {
      let text = displayText;
      setIsTyping(true);

      interval = window.setInterval(() => {
        if (text.length > 0) {
          text = text.slice(0, -1);
          setDisplayText(text);
        } else {
          clearInterval(interval);
          setIsTyping(false);
          setTimeout(onComplete, 200);
        }
      }, 25);
    };

    const nextPhase = () => {
      if (currentPhase < phases.length - 1) {
        eraseText(() => {
          setCurrentPhase(prev => prev + 1);
        });
      } else {
        // Loop back to beginning after a longer pause
        setTimeout(() => {
          eraseText(() => {
            setCurrentPhase(0);
          });
        }, 2000);
      }
    };

    typeText(phases[currentPhase].text, nextPhase);

    return () => {
      if (timeout) clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [currentPhase]);

  return (
    <div className="relative min-h-[100px] flex items-center justify-center">
      <motion.div
        className="text-center relative"
        key={currentPhase}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <motion.h2
          className={`${phases[currentPhase].style} relative z-10`}
          animate={{
            opacity: currentPhase === 1 ? [0.8, 1, 0.8] : 1,
          }}
          transition={{
            duration: 2,
            repeat: currentPhase === 1 ? Infinity : 0,
            ease: 'easeInOut',
          }}
        >
          {displayText}
          <motion.span
            className="inline-block w-0.5 h-6 bg-current ml-1"
            animate={{
              opacity: isTyping ? [1, 0] : 0,
            }}
            transition={{
              duration: 0.6,
              repeat: isTyping ? Infinity : 0,
              ease: 'easeInOut',
            }}
          />
        </motion.h2>

        {/* Kinetic typography effects for phase 2 */}
        {currentPhase === 1 && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Subtle flowing energy lines */}
            {Array.from({ length: 2 }).map((_, i) => (
              <motion.div
                key={`line-${i}`}
                className="absolute h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
                style={{
                  width: '150%',
                  left: '-25%',
                  top: `${40 + i * 20}%`,
                }}
                animate={{
                  x: ['-50%', '50%'],
                  opacity: [0, 0.6, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 1,
                }}
              />
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}