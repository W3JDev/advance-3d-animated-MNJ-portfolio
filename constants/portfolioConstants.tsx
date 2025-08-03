import React from 'react';
import { 
  Coffee,
  Brain,
  Code,
  Building,
  Palette,
  Sparkles,
  Lightbulb,
  Target,
  Rocket
} from 'lucide-react';

export const createBentoItems = (settings: any) => [
  {
    id: '1',
    title: `${settings.experience} Years Experience`,
    description: 'F&B industry expertise meets cutting-edge technology',
    size: 'medium' as const,
    gradient: 'from-purple-600 to-pink-600',
    icon: <Coffee className="w-8 h-8" />,
    content: <div className="text-2xl font-light">2013-2024</div>
  },
  {
    id: '2',
    title: 'AI/ML Mastery',
    description: 'Building intelligent systems that think and learn',
    size: 'small' as const,
    gradient: 'from-blue-600 to-purple-600',
    icon: <Brain className="w-6 h-6" />
  },
  {
    id: '3',
    title: 'Full-Stack Dev',
    description: 'End-to-end application development',
    size: 'small' as const,
    gradient: 'from-green-600 to-blue-600',
    icon: <Code className="w-6 h-6" />
  },
  {
    id: '4',
    title: settings.company,
    description: `Currently building innovative solutions in ${settings.location}`,
    size: 'medium' as const,
    gradient: 'from-yellow-600 to-orange-600',
    icon: <Building className="w-8 h-8" />,
    content: <div className="text-xl font-light">{settings.location}</div>
  },
  {
    id: '5',
    title: 'Creative Tech',
    description: 'Where art meets algorithm',
    size: 'small' as const,
    gradient: 'from-pink-600 to-red-600',
    icon: <Palette className="w-6 h-6" />
  },
  {
    id: '6',
    title: `${settings.roiImpact} ROI Impact`,
    description: 'Delivering measurable business results',
    size: 'small' as const,
    gradient: 'from-indigo-600 to-purple-600',
    icon: <Sparkles className="w-6 h-6" />
  }
];

export const methodology = [
  {
    step: '01',
    title: 'Discovery & Strategy',
    description: 'Deep dive into your business needs, user requirements, and technical constraints to build the perfect foundation.',
    icon: <Lightbulb className="w-6 h-6" />,
    details: 'User interviews, market research, competitive analysis, technical feasibility assessment',
    iconGradient: 'from-amber-500 to-orange-500',
    numberGradient: 'from-amber-400 to-orange-400',
    bgColor: 'from-amber-500/10 to-orange-500/10'
  },
  {
    step: '02',
    title: 'Design & Architecture',
    description: 'Create user-centered designs and robust system architecture that scales beautifully with your growth.',
    icon: <Target className="w-6 h-6" />,
    details: 'Wireframing, prototyping, system design, database architecture, API planning',
    iconGradient: 'from-blue-500 to-cyan-500',
    numberGradient: 'from-blue-400 to-cyan-400',
    bgColor: 'from-blue-500/10 to-cyan-500/10'
  },
  {
    step: '03',
    title: 'Development & Testing',
    description: 'Build with best practices, continuous testing, and iterative improvements for bulletproof reliability.',
    icon: <Code className="w-6 h-6" />,
    details: 'Agile development, automated testing, code reviews, performance optimization',
    iconGradient: 'from-emerald-500 to-teal-500',
    numberGradient: 'from-emerald-400 to-teal-400',
    bgColor: 'from-emerald-500/10 to-teal-500/10'
  },
  {
    step: '04',
    title: 'Launch & Optimization',
    description: 'Deploy seamlessly and continuously optimize based on real-world data and user feedback.',
    icon: <Rocket className="w-6 h-6" />,
    details: 'Deployment automation, monitoring setup, performance tuning, user feedback integration',
    iconGradient: 'from-purple-500 to-pink-500',
    numberGradient: 'from-purple-400 to-pink-400',
    bgColor: 'from-purple-500/10 to-pink-500/10'
  }
];

export const animationConfig = {
  pageTransition: { duration: 0.6 },
  staggerDelay: 0.1,
  viewportMargin: "0px 0px -100px 0px", // Better visibility - trigger animations earlier
  scrollConfig: {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  }
};

export const colorThemes = [
  'rgb(0, 0, 0)',           // Black
  'rgb(15, 15, 30)',        // Dark blue
  'rgb(10, 10, 25)',        // Navy
  'rgb(5, 5, 20)',          // Deep navy
  'rgb(0, 0, 0)',           // Back to black
];