import { motion } from 'framer-motion';
import { ExternalLink, Github, Eye, Calendar, Users, Clock } from 'lucide-react';
import { PremiumHeading, PremiumText } from './PremiumTypography';

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  challenge?: string;
  solution?: string;
  results?: string[];
  tech: string[];
  category: string;
  year: string;
  duration?: string;
  teamSize?: string;
  gradient: string;
  stats?: Array<{ metric: string; value: string }>;
  features?: string[];
  impact?: {
    business: string;
    technical: string;
    user: string;
  };
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

interface AdvancedProjectCardProps {
  project: Project;
  index: number;
  onViewCaseStudy: (project: Project) => void;
}

export function AdvancedProjectCard({ project, index, onViewCaseStudy }: AdvancedProjectCardProps) {
  // Provide safe defaults for potentially undefined properties
  const safeProject = {
    ...project,
    tech: Array.isArray(project.tech) ? project.tech : [],
    stats: Array.isArray(project.stats) ? project.stats : [],
    duration: project.duration || 'N/A',
    teamSize: project.teamSize || 'Solo',
    gradient: project.gradient || 'from-blue-600 to-purple-600',
    githubUrl: project.githubUrl || '',
    liveUrl: project.liveUrl || '',
    category: project.category || 'Development',
    year: project.year || '2024'
  };

  // Ensure we have a valid title and description
  if (!safeProject.title || !safeProject.description) {
    console.warn('Project missing required fields:', safeProject);
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      viewport={{ once: true, margin: "-20px" }}
      className="group relative w-full"
    >
      <div className="relative bg-black/60 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:border-white/30 transition-all duration-500 overflow-hidden h-full flex flex-col min-h-[500px]">
        {/* Gradient background overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${safeProject.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`} />
        
        {/* Category badge */}
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-4 bg-gradient-to-r ${safeProject.gradient} text-white border border-white/30 self-start`}>
          {safeProject.category}
        </div>

        {/* Project title - Ensure it's always visible */}
        <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
          {safeProject.title}
        </h3>

        {/* Description */}
        <p className="text-gray-300 text-sm md:text-base mb-6 line-clamp-3 flex-1">
          {safeProject.description}
        </p>

        {/* Project meta info */}
        <div className="grid grid-cols-3 gap-3 mb-6 text-xs">
          <div className="flex items-center gap-1 text-gray-400">
            <Calendar className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">{safeProject.year}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-400">
            <Clock className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">{safeProject.duration}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-400">
            <Users className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">{safeProject.teamSize}</span>
          </div>
        </div>

        {/* Tech stack - Safe array handling */}
        {safeProject.tech.length > 0 && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {safeProject.tech.slice(0, 4).map((tech, techIndex) => (
                <span 
                  key={`${tech}-${techIndex}`}
                  className="px-2 py-1 text-xs bg-white/10 text-gray-300 rounded-md border border-white/20 font-medium"
                >
                  {tech}
                </span>
              ))}
              {safeProject.tech.length > 4 && (
                <span className="px-2 py-1 text-xs bg-white/10 text-gray-400 rounded-md border border-white/20">
                  +{safeProject.tech.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Stats - Safe array handling with better fallback */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {safeProject.stats && safeProject.stats.length > 0 ? (
            safeProject.stats.slice(0, 3).map((stat, statIndex) => (
              <div key={`${stat.metric}-${statIndex}`} className="text-center">
                <div className="text-lg font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-400 leading-tight">
                  {stat.metric}
                </div>
              </div>
            ))
          ) : (
            // Default stats when none provided
            <>
              <div className="text-center">
                <div className="text-lg font-bold text-white mb-1">
                  {safeProject.year}
                </div>
                <div className="text-xs text-gray-400 leading-tight">
                  Year
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-white mb-1">
                  {safeProject.tech.length}+
                </div>
                <div className="text-xs text-gray-400 leading-tight">
                  Technologies
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-white mb-1">
                  ⭐
                </div>
                <div className="text-xs text-gray-400 leading-tight">
                  Featured
                </div>
              </div>
            </>
          )}
        </div>

        {/* Action buttons - Fixed container to prevent overflow */}
        <div className="mt-auto flex gap-3 items-center">
          <motion.button
            onClick={() => onViewCaseStudy(safeProject)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white text-sm font-medium transition-all duration-300 backdrop-blur-sm"
          >
            <Eye className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">View Case Study</span>
          </motion.button>

          {/* Fixed icon buttons container to prevent overflow */}
          <div className="flex gap-2 flex-shrink-0">
            {safeProject.githubUrl && (
              <motion.a
                href={safeProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white transition-all duration-300 backdrop-blur-sm flex-shrink-0"
                title="View on GitHub"
              >
                <Github className="w-4 h-4" />
              </motion.a>
            )}

            {safeProject.liveUrl && (
              <motion.a
                href={safeProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white transition-all duration-300 backdrop-blur-sm flex-shrink-0"
                title="Live Demo"
              >
                <ExternalLink className="w-4 h-4" />
              </motion.a>
            )}
          </div>
        </div>

        {/* Hover effect shimmer */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
            ease: 'easeInOut',
          }}
          style={{
            opacity: 0,
          }}
          whileHover={{
            opacity: 1,
          }}
        />
      </div>
    </motion.div>
  );
}