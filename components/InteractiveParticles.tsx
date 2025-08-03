import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
}

interface InteractiveParticlesProps {
  particleCount?: number;
  colors?: string[];
  className?: string;
}

export function InteractiveParticles({ 
  particleCount = 50, 
  colors = ['#8b5cf6', '#06b6d4', '#ec4899', '#10b981'],
  className = ''
}: InteractiveParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMouseActive, setIsMouseActive] = useState(false);

  // Initialize particles
  const initializeParticles = useCallback(() => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1,
        maxLife: 1
      });
    }
    setParticles(newParticles);
  }, [particleCount, colors]);

  // Mouse interaction
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsMouseActive(true);
    };

    const handleMouseLeave = () => {
      setIsMouseActive(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      setParticles(prevParticles => {
        return prevParticles.map(particle => {
          let { x, y, vx, vy } = particle;

          // Mouse attraction/repulsion
          if (isMouseActive) {
            const dx = mousePosition.x - x;
            const dy = mousePosition.y - y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
              const force = (150 - distance) / 150;
              const angle = Math.atan2(dy, dx);
              
              // Attraction
              vx += Math.cos(angle) * force * 0.5;
              vy += Math.sin(angle) * force * 0.5;
            }
          }

          // Update position
          x += vx;
          y += vy;

          // Boundary collision
          if (x < 0 || x > canvas.width) vx *= -0.8;
          if (y < 0 || y > canvas.height) vy *= -0.8;

          // Keep particles in bounds
          x = Math.max(0, Math.min(canvas.width, x));
          y = Math.max(0, Math.min(canvas.height, y));

          // Friction
          vx *= 0.99;
          vy *= 0.99;

          // Draw particle
          ctx.save();
          ctx.globalAlpha = particle.life;
          ctx.fillStyle = particle.color;
          ctx.beginPath();
          ctx.arc(x, y, particle.size, 0, Math.PI * 2);
          ctx.fill();
          
          // Glow effect
          ctx.shadowBlur = 20;
          ctx.shadowColor = particle.color;
          ctx.fill();
          ctx.restore();

          return { ...particle, x, y, vx, vy };
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mousePosition, isMouseActive]);

  // Resize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  // Initialize particles on mount
  useEffect(() => {
    initializeParticles();
  }, [initializeParticles]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{ background: 'transparent' }}
    />
  );
}

// Particle burst effect on click
export function ParticleBurst() {
  const [bursts, setBursts] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const newBurst = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY
      };
      
      setBursts(prev => [...prev, newBurst]);
      
      // Remove burst after animation
      setTimeout(() => {
        setBursts(prev => prev.filter(burst => burst.id !== newBurst.id));
      }, 1000);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {bursts.map(burst => (
        <div
          key={burst.id}
          className="absolute"
          style={{ left: burst.x - 50, top: burst.y - 50 }}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
              initial={{ 
                x: 50, 
                y: 50, 
                scale: 0,
                opacity: 1 
              }}
              animate={{
                x: 50 + Math.cos((i * 30) * Math.PI / 180) * 100,
                y: 50 + Math.sin((i * 30) * Math.PI / 180) * 100,
                scale: [0, 1, 0],
                opacity: [1, 1, 0]
              }}
              transition={{
                duration: 1,
                ease: 'easeOut'
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

// Floating particles that follow cursor
export function CursorParticles() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Add new particle
      const newParticle = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        delay: Math.random() * 0.5
      };
      
      setParticles(prev => [...prev.slice(-10), newParticle]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-20">
      {particles.map((particle, index) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: particle.x,
            top: particle.y
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ 
            scale: [0, 1, 0],
            opacity: [1, 0.5, 0]
          }}
          transition={{
            duration: 1,
            delay: particle.delay,
            ease: 'easeOut'
          }}
        />
      ))}
    </div>
  );
}

// Magnetic particle field
export function MagneticParticleField() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const newParticles: Particle[] = [];

    for (let i = 0; i < 30; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        vx: 0,
        vy: 0,
        size: Math.random() * 2 + 1,
        color: '#8b5cf6',
        life: 1,
        maxLife: 1
      });
    }

    setParticles(newParticles);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-64 overflow-hidden rounded-2xl bg-black/20">
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-purple-400"
          style={{
            width: particle.size * 2,
            height: particle.size * 2,
            left: particle.x,
            top: particle.y
          }}
          animate={{
            x: [0, 20, -20, 0],
            y: [0, -10, 10, 0]
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: Math.random() * 2
          }}
        />
      ))}
    </div>
  );
}
