import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';

// Multi-layer parallax container
interface ParallaxLayerProps {
  children: React.ReactNode;
  speed: number;
  className?: string;
  offset?: number;
}

export function ParallaxLayer({ children, speed, className = '', offset = 0 }: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [offset, offset + speed * 100]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });
  
  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{ y: smoothY }}
    >
      {children}
    </motion.div>
  );
}

// Advanced parallax scene with multiple layers
export function ParallaxScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Multiple parallax speeds for depth
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const midgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const foregroundY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  
  // Rotation effects
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1]);
  
  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden">
      {/* Background Layer - Slowest */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-blue-900/20 to-black/40" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      </motion.div>

      {/* Midground Layer - Medium Speed */}
      <motion.div
        className="absolute inset-0 z-10"
        style={{ y: midgroundY, scale }}
      >
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2">
          <motion.div
            className="w-32 h-32 border border-white/20 rounded-full"
            style={{ rotate }}
          />
        </div>
        <div className="absolute bottom-1/3 left-1/4">
          <motion.div
            className="w-24 h-24 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg"
            style={{ rotate: useTransform(rotate, r => -r) }}
          />
        </div>
      </motion.div>

      {/* Foreground Layer - Fastest */}
      <motion.div
        className="absolute inset-0 z-20 flex items-center justify-center"
        style={{ y: foregroundY }}
      >
        <div className="text-center">
          <motion.h2
            className="text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Parallax Magic
          </motion.h2>
          <motion.p
            className="text-xl text-white/70 mt-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Multi-layer depth scrolling experience
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}

// Parallax text reveal effect
interface ParallaxTextProps {
  text: string;
  className?: string;
}

export function ParallaxText({ text, className = '' }: ParallaxTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.25"]
  });

  const words = text.split(' ');

  return (
    <div ref={ref} className={`relative ${className}`}>
      <div className="flex flex-wrap gap-2">
        {words.map((word, index) => {
          const start = index / words.length;
          const end = start + (1 / words.length);
          
          const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
          const y = useTransform(scrollYProgress, [start, end], [50, 0]);
          
          return (
            <motion.span
              key={index}
              className="inline-block"
              style={{ opacity, y }}
            >
              {word}
            </motion.span>
          );
        })}
      </div>
    </div>
  );
}

// 3D Parallax card stack
interface ParallaxCardStackProps {
  cards: Array<{
    title: string;
    content: string;
    color: string;
  }>;
}

export function ParallaxCardStack({ cards }: ParallaxCardStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <div ref={containerRef} className="relative h-[200vh] flex items-center justify-center">
      <div className="relative w-80 h-96">
        {cards.map((card, index) => {
          const targetScale = 1 - ((cards.length - index) * 0.05);
          const scale = useTransform(
            scrollYProgress,
            [0, 1],
            [1, targetScale]
          );
          
          const y = useTransform(
            scrollYProgress,
            [0, 1],
            [0, -index * 50]
          );
          
          const rotate = useTransform(
            scrollYProgress,
            [0, 1],
            [0, index * 5]
          );

          return (
            <motion.div
              key={index}
              className={`absolute inset-0 rounded-2xl p-6 ${card.color} backdrop-blur-xl border border-white/10`}
              style={{
                scale,
                y,
                rotate,
                zIndex: cards.length - index
              }}
            >
              <h3 className="text-2xl font-bold text-white mb-4">{card.title}</h3>
              <p className="text-white/80">{card.content}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// Infinite parallax background
export function InfiniteParallaxBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, -100]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -200]);
  const y3 = useTransform(scrollY, [0, 1000], [0, -300]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Layer 1 - Slowest */}
      <motion.div
        className="absolute inset-0"
        style={{ 
          y: y1,
          x: useTransform(() => -mousePosition.x * 0.02)
        }}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-cyan-500/5 rounded-full blur-2xl" />
      </motion.div>

      {/* Layer 2 - Medium */}
      <motion.div
        className="absolute inset-0"
        style={{
          y: y2,
          x: useTransform(() => -mousePosition.x * 0.05)
        }}
      >
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-pink-500/10 rounded-full blur-xl" />
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-lg" />
      </motion.div>

      {/* Layer 3 - Fastest */}
      <motion.div
        className="absolute inset-0"
        style={{
          y: y3,
          x: useTransform(() => -mousePosition.x * 0.1)
        }}
      >
        <div className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-yellow-500/15 rounded-full blur-md" />
        <div className="absolute top-1/3 right-1/2 w-16 h-16 bg-green-500/15 rounded-full blur-sm" />
      </motion.div>
    </div>
  );
}

// Mouse-following parallax effect
interface MouseParallaxProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export function MouseParallax({ children, strength = 20, className = '' }: MouseParallaxProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      setMousePosition({
        x: (e.clientX - centerX) / strength,
        y: (e.clientY - centerY) / strength
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [strength]);

  return (
    <motion.div
      ref={ref}
      className={className}
      animate={{
        x: mousePosition.x,
        y: mousePosition.y
      }}
      transition={{ type: 'spring', stiffness: 150, damping: 15 }}
    >
      {children}
    </motion.div>
  );
}
