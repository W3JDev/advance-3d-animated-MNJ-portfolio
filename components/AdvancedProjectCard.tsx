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
      <div className="relative bg-black/90 backdrop-blur-xl border border-white/30 rounded-2xl p-6 hover:border-white/50 transition-all duration-300 overflow-hidden h-full flex flex-col min-h-[500px] shadow-2xl">
        {/* Enhanced gradient background overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${safeProject.gradient} opacity-0 group-hover:opacity-15 transition-opacity duration-300 rounded-2xl`} />

        {/* Category badge - Enhanced visibility */}
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-4 bg-gradient-to-r ${safeProject.gradient} text-white border border-white/50 self-start shadow-lg`}>
          {safeProject.category}
        </div>

        {/* Project title - Enhanced readability */}
        <h3 className="text-xl md:text-2xl font-bold text-white mb-3 leading-tight tracking-tight">
          {safeProject.title}
        </h3>

        {/* Description - Better contrast */}
        <p className="text-gray-100 text-sm md:text-base mb-6 line-clamp-3 flex-1 leading-relaxed">
          {safeProject.description}
        </p>

        {/* Project meta info - Enhanced visibility */}
        <div className="grid grid-cols-3 gap-3 mb-6 text-xs">
          <div className="flex items-center gap-1 text-gray-200">
            <Calendar className="w-3 h-3 flex-shrink-0 text-white/80" />
            <span className="truncate font-medium">{safeProject.year}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-200">
            <Clock className="w-3 h-3 flex-shrink-0 text-white/80" />
            <span className="truncate font-medium">{safeProject.duration}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-200">
            <Users className="w-3 h-3 flex-shrink-0 text-white/80" />
            <span className="truncate font-medium">{safeProject.teamSize}</span>
          </div>
        </div>

        {/* Tech stack - Enhanced readability */}
        {safeProject.tech.length > 0 && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {safeProject.tech.slice(0, 4).map((tech, techIndex) => (
                <span
                  key={`${tech}-${techIndex}`}
                  className="px-3 py-1.5 text-xs bg-white/20 text-white rounded-lg border border-white/30 font-semibold backdrop-blur-sm hover:bg-white/30 transition-colors duration-200"
                >
                  {tech}
                </span>
              ))}
              {safeProject.tech.length > 4 && (
                <span className="px-3 py-1.5 text-xs bg-white/15 text-gray-200 rounded-lg border border-white/25 font-medium">
                  +{safeProject.tech.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Stats - Enhanced visual hierarchy */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {safeProject.stats && safeProject.stats.length > 0 ? (
            safeProject.stats.slice(0, 3).map((stat, statIndex) => (
              <div key={`${stat.metric}-${statIndex}`} className="text-center bg-white/5 rounded-lg p-3 border border-white/10">
                <div className="text-lg font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-200 leading-tight font-medium">
                  {stat.metric}
                </div>
              </div>
            ))
          ) : (
            // Default stats when none provided - Enhanced styling
            <>
              <div className="text-center bg-white/5 rounded-lg p-3 border border-white/10">
                <div className="text-lg font-bold text-white mb-1">
                  {safeProject.year}
                </div>
                <div className="text-xs text-gray-200 leading-tight font-medium">
                  Year
                </div>
              </div>
              <div className="text-center bg-white/5 rounded-lg p-3 border border-white/10">
                <div className="text-lg font-bold text-white mb-1">
                  {safeProject.tech.length}+
                </div>
                <div className="text-xs text-gray-200 leading-tight font-medium">
                  Technologies
                </div>
              </div>
              <div className="text-center bg-white/5 rounded-lg p-3 border border-white/10">
                <div className="text-lg font-bold text-white mb-1">
                  ⭐
                </div>
                <div className="text-xs text-gray-200 leading-tight font-medium">
                  Featured
                </div>
              </div>
            </>
          )}
        </div>

        {/* Action buttons - Enhanced styling and performance */}
        <div className="mt-auto flex gap-3 items-center">
          <motion.button
            onClick={() => onViewCaseStudy(safeProject)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/20 hover:bg-white/30 border border-white/30 rounded-xl text-white text-sm font-semibold transition-all duration-200 backdrop-blur-sm shadow-lg hover:shadow-xl"
          >
            <Eye className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">View Case Study</span>
          </motion.button>

          {/* Enhanced icon buttons */}
          <div className="flex gap-2 flex-shrink-0">
            {safeProject.githubUrl && (
              <motion.a
                href={safeProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 flex items-center justify-center bg-white/20 hover:bg-white/30 border border-white/30 rounded-xl text-white transition-all duration-200 backdrop-blur-sm flex-shrink-0 shadow-lg hover:shadow-xl"
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
                className="w-12 h-12 flex items-center justify-center bg-white/20 hover:bg-white/30 border border-white/30 rounded-xl text-white transition-all duration-200 backdrop-blur-sm flex-shrink-0 shadow-lg hover:shadow-xl"
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